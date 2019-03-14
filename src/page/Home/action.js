import axios from 'axios'

export const postTable = (json, code, scope, table,fn)=>{
    let url = '/v1/chain/get_table_rows'
    axios.post(url, {
        json: json,
        code: code,
        scope: scope,
        table: table
      })
      .then( (response) => {
        fn(response.data);
    })
      .catch(function (error) {
        fn(error);
    });
}