export const DataList = () => {
    const data = [];
    let date = new Date();
    // console.log(date)
    let num = ("0000000" + 100000000 * Math.random()).match(/(\d{8})(\.|$)/)[1];

    for (let i = 0; i < 26; i++) {
        data.push({
          key: i,
          id: num,
          trading: 0,
          time: JSON.stringify (date),
          producers:  `fibosProducer ${i}`
        });
    }
    return data
};


export const TradingList = () => {
  const data = [];
  let  id = Math.random().toString(36).substr(2);

  for (let i = 0; i < 26; i++) {
      data.push({
        key: i,
        id: id,
        account: `fibosProducer ${i}`,
        contract:  `EosToken ${i+10}`
      });
  }
  return data
};



