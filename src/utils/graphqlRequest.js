import { graphqlServerUrl } from '../assets/String';


async function graphqlRequest (requestBody){

    try {
        const result = await fetch(graphqlServerUrl,{
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('dispenseToken')
                }
            });

        const data = await result.json();
        return data;
    } catch (e) {
        return { error: true };
    }

}

export {graphqlRequest} ;