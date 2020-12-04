import { userData, API_URL, userOutLet } from '../../../../config/settings';

export async function post_Get_Majo_Group_Id(majoGroupId) {
    const TOKEN = userData.TOKEN;
    // console.log(TOKEN);

    const body = {
        PROPERTY_CODE: userData.PROPERTY_CODE,
        MAJOR_GROUP_ID: majoGroupId,
    };

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `${TOKEN}`);

    const response = await fetch(`${API_URL}api/CheckRequest/loadDataByMajorId/`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body),
    })
        .then((response) => response.json())
        .then((result) => {

            return result;
        })
        .catch((error) => {
            console.log(error);
        });
    return response;
}
