const apollo = require("apollo-fetch");
const graphAirdrops = apollo.createApolloFetch({
    uri: "https://api.thegraph.com/subgraphs/name/froid1911/aavegotchi-airdrops",
});

const graphCoreMatic = apollo.createApolloFetch({
    uri: "https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic",
});

const graphSnapshot = apollo.createApolloFetch({
    uri: "https://hub.snapshot.org/graphql",
});

export default async (gotchiId = null) => {
    let queryAirdrops = `{
        airdropReceivers( orderBy: timestamp, orderDirection: desc) {
            id
            airdrop {
            id
            }
            amount
            gotchi
            timestamp
        }
    }`;

    let votes = [];

    if (gotchiId != null) {
        queryAirdrops = `{
            airdropReceivers( where:{gotchi: ${gotchiId}} orderBy: timestamp, orderDirection: desc) {
                id
                airdrop {
                id
                }
                amount
                gotchi
                timestamp
            }
        }`;

        // fetch owner
        let ownerQuery = `{aavegotchi(id:"${gotchiId}") {
            originalOwner {
                id
            }
        }}`;

        const ownerResult = await graphCoreMatic({ query: ownerQuery });
        const owner = ownerResult.data.aavegotchi.originalOwner.id;

        // fetch snapshot votes
        let querySnapshotVotes = `{
            votes(first:1000, where:{voter:"${owner}"}) {
                id
                voter
                proposal {
                    id
                    title
                    end
                }
                choice
                vp
            }
        }`;

        const snapshotResult = await graphSnapshot({
            query: querySnapshotVotes,
        });
        votes = snapshotResult.data.votes;
    }

    let result = await graphAirdrops({ query: queryAirdrops });

    let airdrops = result.data.airdropReceivers.map((e) => {
        let date = new Date(e.timestamp * 1000);
        let amount = e.amount;
        let gotchi = e.gotchi;
        return { amount, date, gotchi };
    });

    return { gotchiId, airdrops, votes };
};
