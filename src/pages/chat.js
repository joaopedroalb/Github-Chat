import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import { useContext, useEffect,useState } from 'react';
import appConfig from '../../config.json';
import { UsernameContext } from '../Data/UsernameContext';
import { createClient } from '@supabase/supabase-js'
import {ButtonSendSticker} from '../components/ButtonSendSticker'



export default function Chat() {
    const [mensagem, setMensagem] = useState('');
    const [lstMsg, setlstMsg] = useState([]);
    const [loading,setLoading] = useState(true)
    const {username} = useContext(UsernameContext)
    const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)


    useEffect(()=>{
        async function fetchData(){
            const resp = await supabaseClient.from('messages').select('*')
            const lst = resp.data.sort((a,b)=>{
                if(a.id>b.id) 
                    return -1
                if(a.id<b.id)
                    return 1
                
                return 0
            })
            setlstMsg(lst.filter(m=>!m.disable))
            setLoading(false)
        }
        fetchData()
        
    },[])

    async function removeMsg(id){
        console.log(id)
        await supabaseClient.from('messages').update({disable:true}).match({id:id})

        let newList = lstMsg.filter(x=>x.id!=id)
    
        setlstMsg(newList)
    }

    async function handleNewMessage(newMessage) {
        if(newMessage.replaceAll(' ','')=='')
            return null

        const msg = {
            user: username,
            text: newMessage,
        };

        const resp = await supabaseClient.from('messages').insert([msg])
        console.log(resp.data[0])
        const newMsg = resp.data

        setlstMsg([
            ...newMsg,
            ...lstMsg,
        ]);

        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://static.vecteezy.com/system/resources/previews/003/337/350/non_2x/pink-shrimps-seafood-japanese-chinese-cuisine-pattern-banner-vector.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList mensagens={lstMsg} removeMsg={removeMsg} loading={loading}/>
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            disabled={loading}
                            value={mensagem}
                            onChange={(e) =>setMensagem(e.target.value)}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNewMessage(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                marginTop:'10px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Box
                            styleSheet={{
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center',
                                gap:'8px'
                            }}
                        >
                            
                            <Button
                                type='button'
                                label='Enviar'
                                onClick={()=>handleNewMessage(mensagem)}
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.primary[500],
                                    mainColorLight: appConfig.theme.colors.primary[400],
                                    mainColorStrong: appConfig.theme.colors.primary[600],
                                }}
                                styleSheet={{
                                    display:{xs:'none',md:'block'},
                                    marginBottom:'4px'
                                }}
                            />
                            <ButtonSendSticker styleSheet={{marginTop:'4px'}}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Shirmp Zap
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {

    function dateMsg(date){

        const newDate = new Date(date)
        console.log(typeof newDate)
        
        const dd = String(newDate.getDate()).padStart(2, '0');
        const mm = String(newDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = newDate.getFullYear();

       return dd + '/' + mm + '/' + yyyy
    }

    function renderContentMsg(textMsg){
        if(textMsg.includes(':sticker:')){
            let url = textMsg.replace(':sticker:','')
            url = url.replace(' ','')
            return(
                <Image
                    styleSheet={{
                        width: '300px',
                        height: '300px',
                        marginLeft:'2rem'
                    }}
                    src={url}
                />
            )
        }

        return textMsg
    }

    function renderDefaultMsg(){
        const loadingImage = 'https://monophy.com/media/THksdFc9bFRAQcIc13/monophy.gif'
        if(props.loading){
            return (
                <Box
                    tag="li"
                    styleSheet={{
                        borderRadius: '5px',
                        marginBottom: '12px',
                    }}
                >
                    <Image
                        styleSheet={{
                            width: '70px',
                            height: '70px',
                            display: 'inline-block',
                            marginLeft: '1rem',
                        }}
                        src={loadingImage}
                    />
                </Box>
            )
        }

        return null
    }
    
    return (
        <Box
            tag="ul"
            styleSheet={{
                wordBreak:'break-all',
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {renderDefaultMsg()}
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: 'flex',
                                alignItems:'center',
                                justifyContent:'space-between',
                                paddingRight:'1rem'

                            }}
                        >
                            <Box styleSheet={{display:'flex',alignItems:'center'}}>
                                <a href={`https://github.com/${mensagem.user}`} style={{display:'flex',alignItems:'center'}}>
                                    <Image
                                        
                                        styleSheet={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            display: 'inline-block',
                                            marginRight: '8px',
                                            cursor: 'pointer'
                                        }}
                                        src={`https://github.com/${mensagem.user}.png`}
                                    />

                                    <Text tag="strong" styleSheet={{cursor:'pointer',color:'#FFFF'}}>
                                    {mensagem.user}
                                    </Text>
                                </a>
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        marginLeft: '8px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {dateMsg(mensagem.created_at)}
                                </Text>
                            </Box>
                            <Icon   label="Icon Component" 
                                    name='FaRegTrashAlt'  
                                    styleSheet = {{
                                        cursor: 'pointer',
                                        hover: {
                                            color: '#bcbaba',
                                        }
                                    }} 
                                    onClick={()=>props.removeMsg(mensagem.id)}/>
                        </Box>
                        <Text 
                            styleSheet={{
                                color: '#bcbaba'
                            }}
                        >
                            {renderContentMsg(mensagem.text)}
                        </Text>
                    </Text>
                );
            })}
        </Box>
    )
}