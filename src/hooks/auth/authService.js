import { settings } from "@/settings";
import router from "@/router";
import axios from "axios";



export default class authService {


    login(login, password) {

        let body = {
            'login': login,
            'password': password
        };
        axios.post(settings.API_URL + 'login', body).then(response => {
            if(response.data.error != 1){
                localStorage.setItem('api_key', response.data.api_key);
                router.push("/admin/aniversario");
                return 1;
            }
            else
            {
                return 0;
            }
        }).catch(err => {
            err;
            console.log(err);
        });

    }

    logout() {

        localStorage.removeItem('api_key');
        router.push('/admin');
 
    }


}