import GitHubLogin from "react-github-login";
import axios from 'axios';

interface IProps {};

const LoginPage:React.FC<IProps> = () => {
    const onSuccessGithub = async(response:any) => {
        const {code} = response;
        const {data} = await axios.post('/auth', {code});

        console.log(data);
    }

    return (
        <div>
            <div>
                <GitHubLogin 
                    clientId="88646c7a2d563129879e"
                    onSuccess={onSuccessGithub}
                    buttonText="LOGIN WITH GITHUB"
                    className="git-login"
                    valid={true}
                    redirectUri="http://localhost:3000"
                />  
            </div>
        </div>
    )
}

export default LoginPage;