import leo from '../Pages/leo.gif';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

function SecuredPage() {
 const history = useHistory();

 return (
  <div className="SECURE">
   <div style={{marginLeft:"1rem"}}>
   <h1 style={{color:"whitesmoke"}}>Congratulations!! You have logged in!!</h1>
   <img className="leo" src={leo} alt="leo"></img>
   <Button style={{display:"block"}} onClick={ ()=>history.push("/login")}  positive>Back to Login</Button>
  </div>
   </div>

)
}
export {SecuredPage}