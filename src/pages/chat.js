import { Box, TextField, Button } from '@skynexui/components';
import { useContext, useEffect,useState } from 'react';
import appConfig from '../../config.json';
import { UsernameContext } from '../Data/UsernameContext';
import { createClient } from '@supabase/supabase-js'
import {ButtonSendSticker} from '../components/ButtonSendSticker'
import Header from '../components/Header';
import MessageList from '../components/MessageList'


export default function Chat() {
    const [mensagem, setMensagem] = useState('');
    const [lstMsg, setlstMsg] = useState([]);
    const [loading,setLoading] = useState(true)
    const {username} = useContext(UsernameContext)
    const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)


    function updateMessagesRealTime(){

        return supabaseClient
                    .from('messages')
                    .on('INSERT',(data)=>{
                        setlstMsg((currentValue)=>{
                            return [data.new,...currentValue]
                        })
                    })
                    .subscribe()

    }

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
        
        updateMessagesRealTime()
    },[])

    async function removeMsg(id){
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

        await supabaseClient.from('messages').insert([msg])

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
                            <ButtonSendSticker 
                                styleSheet={{marginTop:'4px'}} 
                                onStickerClick={sticker=>{
                                   handleNewMessage(`:sticker:${sticker}`)
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}