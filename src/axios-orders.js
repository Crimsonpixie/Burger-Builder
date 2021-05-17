import axios from 'axios';
const instance=axios.create({
 baseURL:'https://react-my-burger-ca02b-default-rtdb.firebaseio.com/',
})
export default instance;