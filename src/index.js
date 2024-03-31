import React from 'react';
import ReactDOM from 'react-dom';
import AdminLayout from 'layouts/admin';
import ContractorLayout from 'layouts/contractor'
import SignIn from 'views/auth'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import theme from 'theme/theme';
import 'assets/css/App.css';
// Context import 
import UserContextProvider from 'context/user-context'; 

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
      <UserContextProvider>
        <ThemeEditorProvider>
          <BrowserRouter>
          <Switch>
            {/* logic to determine if the user is authenticated */}
            <Route path="/signin" component={SignIn} />
            <Route path="/admin" component={AdminLayout} />
            <Route path="/contractor" component={ContractorLayout} />
            <Redirect from="/" to="/signin" />
          </Switch>
          </BrowserRouter>
        </ThemeEditorProvider>
      </UserContextProvider>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);
