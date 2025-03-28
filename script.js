        var unityIframe = document.getElementById('unity-iframe');
        var unityInstance;

async function send(){
      let file = document.getElementById('file');
      let img = file.files[0];
      

      if(!img){
            alert('Selecione uma imagem para enviar!')
      }else{
        
        const formData = new FormData();
        formData.append('image', img);

    try {
        const response = await fetch('https://api.imgbb.com/1/upload?key=18c309babaac947633eaa732474c985b', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        
        if (data.status === 200) {
            let url = data.data.url
            console.log('Imagem enviada com sucesso:', url);
            sendTextureToUnity(url);
            return;
            
        } else {
            throw new Error('Falha no upload');
        }
    } catch (error) {
        console.error('Erro no upload:', error);
    }

      }
}

function sendTextureToUnity(imageUrl) {
    if (unityIframe.contentWindow) {
        unityIframe.contentWindow.postMessage({
            type: 'ChangeTexture',
            url: imageUrl
        }, '*'); // '*' pode ser substituído por um domínio específico, por segurança
    } else {
        console.error('Iframe não encontrado ou ainda não carregado.');
    }
}