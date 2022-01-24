import appConfig from '../../config.json'

function GlobalStyle() {
    return (
      <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
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

function HomePage() {
    return (
        <div>
            <GlobalStyle/>
            <h1>
                Setup environment ...
            </h1>

            <style jsx>{`
                h1{
                    color:${appConfig.theme.colors.primary['800']}    
                }    
            `}</style>
        </div>
    )
  }
  
  export default HomePage