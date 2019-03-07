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

export async function post(url, params) {
  try {
    const result = await axios({
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: params
    });
    return result.data;
  } catch (err) {
    if (err.response && err.response.status && err.response.status === 403) {
      window.location.href = '/';
    }
    throw err;
  }
}