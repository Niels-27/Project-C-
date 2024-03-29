import axios from 'axios';

class ApiCall {

    public link: string;
    private PATH_BASE: string = 'http://localhost:5000/api';

    public async result(post: object = {}) {

        if (this.checkObjectEmpty(post)) {
            return await this.MakeGetCall();
        }
        return this.MakePostCall(post);
    }

    public setURL(link: string, first: string = "", second: string = "") {
        switch (link) {
            case "allProducts":
                this.link = "/product";
                break;
            case "categorie":
                this.link = "/categories/" + first;
                break;

            case "details":
                this.link = "/product/" + first + "/details";
                break;

            case "pageNation":
                this.link = "/product/paged/"+ first + "/" + second;

                break;
            case "array-id":
                this.link = "/products-by/array";
                break;
            case "authenticate":
                this.link = "/user/authenticate";
                break;
            case "search":{
                if(second !== "all" && second){
                    this.link = "/categories/" + second + "/" + first;
                }
                else{
                    this.link = "/product/search/" + first;
                }
                break;  
            }
            case "paymentSucces":
                this.link = "/PayEmail/" + first + "/" + second;;
                break;
            case "userdata":
                this.link = "/user/getUserInfo";
                break;
            case "addressdata":
                this.link = "/user/getAddressInfo";
                break;
            case "addressbyId":
                this.link ="/user/getAddressById";
                break;
            case "allAdresses":
                this.link = "/user/getAllAdresses";
                break;
            case "postAddress":
                this.link = "/user/postAddress";
                break;
            case "removeAddress":
                this.link = "/user/removeAddress";
                break;
            case "wishlistAdd":
                this.link = "/user/wishlistAdd";
                break;
            case "wishlistdata":
                this.link = "/user/getWishListInfo";
                break;     
            case "updateUser":{
                this.link = "/user/updateUser/" + first;
                break;
                }
            case "checkuser":
                this.link = "/user/checkuser";
                break;
            case "register":
                this.link = "/user/register";
                break;  
            case "registerGuest":
                this.link = "/user/registerGuest";
                break;
            case "checkemail":
                this.link = "/user/checkemail";
                break; 
            case "postorder":
                this.link = "/order/post";
                break;
            case "getOrders":
                this.link = "/order/get/" + first;
                break;
            case "getHistory":
                this.link = "/order/getHistory/" + first;
                break;
            case "Adminuserdata":
                this.link = "/admin/users/all";
                break;       
            case "AdminuserdataView":
                this.link = "/admin/users/byid/" + first;
                break;    
            case "AdminuserdataChange":
                this.link = "/user/updateUser/ChangeByid/";
                break;   
            case "AdminProductdataChange":
                this.link = "/admin/products/update/byid";
                break; 
            case "Adminuserstats":
                this.link = "/admin/stats/users/registrations";
            break;   
            case "Adminsalestats":
                this.link = "/admin/stats/sales/thisYear";
            break;
            case "AdminPopulairStats":
                this.link = "/admin/stats/sales/thenBest";
            break;
            case "AdminStatsManOrWoman":
                this.link = "/admin/stats/overallSales/manOrWoman";
                break;
            case "AdminStatsCategorie":
                this.link = "/admin/stats/overallSales/Categorie";
                break;
            case "AdminStatsRigisterdVSGuest":
                this.link = "/admin/stats/users/vs/guest";
                break;
            case "removeUser":
                this.link = "/admin/users/delete/" + first;
                break;
                case "removeProduct":
                this.link = "/admin/products/delete/" + first;
                break;
            case "AdminAllCattegories":
                this.link = "/admin/cattegorie/all"
                break;
            case "AdminGetAllSizes":
                this.link = "/admin/sizes/all"
                break;
            case "AdminNewProduct":
                this.link = "/admin/new/Product"
                break;
                
            default:
                this.link = "/product";
                return "there was no availeble option defined. basic path used!";
        }
        console.log(this.link);
        return "Path defined. used path for ${link}";
    }
    public MakeDeliteCall() {
        return axios.delete(this.PATH_BASE + this.link)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return {};
            });
    }
    private MakeGetCall() {
        return axios.get(this.PATH_BASE + this.link)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return {};
            });
    }

   

    private MakePostCall(post) {
        console.log(post);
        return axios.post(this.PATH_BASE + this.link, 
            JSON.stringify(post)
        )
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(post);
                console.log(err);
                return err;
            });
    }

    private checkObjectEmpty(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
}

export default ApiCall;

