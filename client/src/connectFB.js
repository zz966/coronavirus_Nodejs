import axios from 'axios'

const url = '/confirmedcases';
//const url = 'http://localhost:3000/confirmedcases';
const current_status_url = '/current_status';

class DataResource{
    static getConfirmedCases(){
        return new Promise((resolve,reject)=>{

            try{
              
                const res = axios.get(url);     
                resolve(res)   

            }catch(err){
                reject(err);
            }
        })
    }

    static getCurrentStatus(){
        return new Promise((resolve,reject)=>{

            try{
              
                const res = axios.get(current_status_url);     
                resolve(res)   

            }catch(err){
                reject(err);
            }
        })
    }
}

export default DataResource;