import {userData, API_URL} from '../../../../config/settings';

export async function getSearchItem(nameSearch){
    const TOKEN = userData.TOKEN;
    

    const body = {
        PROPERTY_CODE: userData.PROPERTY_CODE,
        OUTLET_ID: userData.OUTLET_ID,
        NAME: nameSearch,
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
        'Authorization', `${TOKEN}`
    );

    const response = await fetch(
        `${API_URL}api/Item/searchItemByName/`,

        {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(body),
        },
    )
        .then((response) => response.json())
        .then((result) => {

            console.log('ApiNewSearch:', result);
            return result;
        })
        .catch((error) => {
            console.log(error);
        });
    return response;
}