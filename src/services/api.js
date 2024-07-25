const api_url = 'http://212.113.102.189:7000';


export async function register(user) {
    const response = await fetch(api_url + '/auth/register', {
        'method': 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    })

    const data = await response.json();
    if (data.token !== undefined) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('login', user['login']);
    }
    return data;
}

export async function login(user) {


    const response = await fetch(api_url + '/auth/login', {
        'method': 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    })

    const data = await response.json();

    if (data.token !== undefined) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('login', user['login']);
    }
    return data
}

export async function newFile(parentId, file) {
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('folderId', parentId);
    formData.append('file', file);

    console.log('formData', formData.getAll('folderId'), formData.getAll('file'))

    const response = await fetch(api_url + '/drive/files', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
        body: formData
    })

    let data = await response.json();
    console.log(data.data);
    return data.data;
}

export async function deleteFile(id) {
    let token = localStorage.getItem('token');
    const response = await fetch(api_url + `/drive/files/${id}`, {
        'method': 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    })

    let data = await response.json();
    console.log(data.data);
    return data.data;
}

export async function showFolder(id) {
    let token = localStorage.getItem('token');
    const response = await fetch(api_url + `/drive/folder/${id}`, {
        'method': 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            // 'Content-Type': 'application/json;charset=utf-8'
        }
    })

    let data = await response.json();
    console.log(data.data);

    return data.data;
}

export async function editFolder(id, newParentId,newName) {
    console.log('Edit api:', id, newName, newParentId);

    let token = localStorage.getItem('token');
    const body = {
        parentId: newParentId,
        name: newName
    }
    const response = await fetch(api_url + `/drive/folder/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    })
    let data = await response.json();

    console.log(data);
    console.log(id, body);
    return data;
}

export async function deleteFolder(id) {
    let token = localStorage.getItem('token');
    const response = await fetch(api_url + `/drive/folder/${id}`, {
        'method': 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    let data = await response.json();
    console.log(data.data);
    return data.data;
}

export async function newFolder(parentId, name) {
    let token = localStorage.getItem('token');

    const response = await fetch(api_url + `/drive/folder`, {
        'method': 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({parentId: parentId, name: name})
    })

    let data = await response.json();
    console.log(data.data);
    return data.data;
}

