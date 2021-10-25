const apollo = require("apollo-fetch");
const graphAirdrops = apollo.createApolloFetch({
    uri: "https://api.thegraph.com/subgraphs/name/froid1911/aavegotchi-airdrops"
});

export default async (gotchiId = null) => {
    console.log(gotchiId);
    let query = `{
        airdropReceivers( where:{gotchi: ${gotchiId}} orderBy: timestamp, orderDirection: desc) {
            id
            airdrop {
            id
            }
            amount
            gotchi
            timestamp
        }
    }`

    if(gotchiId == null) {
        query = `{
            airdropReceivers( orderBy: timestamp, orderDirection: desc) {
                id
                airdrop {
                id
                }
                amount
                gotchi
                timestamp
            }
        }`  
    }

    let result = await graphAirdrops({query})
    console.log(result);
    let airdrops = result.data.airdropReceivers.map(e => {
        let date = new Date(e.timestamp * 1000)
        let amount = e.amount
        let gotchi = e.gotchi
        return ({amount, date, gotchi})
    })
    return {gotchiId, airdrops}
}