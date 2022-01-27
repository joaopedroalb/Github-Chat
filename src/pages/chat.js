import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React, { useContext } from 'react';
import appConfig from '../../config.json';
import { UsernameContext } from '../Data/UsernameContext';



export default function Chat() {
    const [mensagem, setMensagem] = React.useState('');
    const [lstMsg, setlstMsg] = React.useState([]);
    const {username} = useContext(UsernameContext)

    function removeMsg(id){
        const newList = lstMsg.filter(x=>x.id!=id)
        setlstMsg(newList)
    }

    function handleNewMessage(newMessage) {
        if(newMessage.replaceAll(' ','')=='')
            return null
        const msg = {
            id: lstMsg.length + 1,
            user: username,
            texto: newMessage,
        };

        setlstMsg([
            msg,
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
                    <MessageList mensagens={lstMsg} removeMsg={removeMsg} />
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
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
                                display:{xs:'none',md:'block'}
                            }}
                        />
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
                            <Box>
                                <Image
                                    styleSheet={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                    }}
                                    src={`https://github.com/${mensagem.user}.png`}
                                />
                                <Text tag="strong">
                                    {mensagem.user}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        marginLeft: '8px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {(new Date().toLocaleDateString())}
                                </Text>
                            </Box>
                            <Icon   label="Icon Component" 
                                    name='FaRegTrashAlt'  
                                    styleSheet = {{
                                        cursor: 'pointer'
                                    }} 
                                    onClick={()=>props.removeMsg(mensagem.id)}/>
                        </Box>
                        {mensagem.texto}
                    </Text>
                );
            })}
        </Box>
    )
}