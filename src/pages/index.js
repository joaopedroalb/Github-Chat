import {Box,Button,Text,TextField,Image} from '@skynexui/components'
import appConfig from '../../config.json'

function GlobalStyle() {
    return (
      <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
          background:black;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 
      `}</style>
    );
  }

function Title(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
        <Tag>{props.children}</Tag>
        <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['000']};
                    font-size: 24px;
                    font-weight: 600;
                }
                `}</style>
        </>
    );
}

function HomePage() {
    return (
        <div>
            <GlobalStyle/>

            <Title tag='h2'>
                Ola mundo !!!!!!!!!
            </Title>

        </div>
    )
  }
  
  export default HomePage