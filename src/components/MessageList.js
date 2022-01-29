import { Box, Text, Image, Icon } from '@skynexui/components';
import appConfig from '../../config.json';

export default function MessageList(props) {

    function dateMsg(date){

        const newDate = new Date(date)
        
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