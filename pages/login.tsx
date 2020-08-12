import GitHubLogin from "react-github-login";

interface IProps {};

const LoginPage:React.FC<IProps> = () => {
    const onSuccessGithub = (response:Response) => {
        console.log(response);
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