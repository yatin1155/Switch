var switchModule = (function () {
    var imageList =[];
    var imageCount = 14;  //count of images to load
    var $gallery = $("#gallery");

    var loadImages = () => {
        fetch("https://dog.ceo/api/breeds/image/random/"+imageCount)
            .then((response) => response.json())
            .then((data) => data.message)
            .then((arrayOfLinks) => updateList(arrayOfLinks))
            .catch((e) => console.log(e));
    };
    var updateList =(links) =>{
        imageList = [];
        for (let i = 0; i < links.length; i++) {
            let obj = {};
            obj['index'] = i;
            obj['imageUrl'] = links[i];
            obj['text'] = "Image " + (i+1);
            imageList.push(obj);
        }
        // addImages();
    };

    var addImages = () =>{
        for(let item of imageList){
            var str = '';
            str = `
            <div class="single-img">
                <div class="imgBox">
                    <img src="${item.imageUrl}" alt="">
                </div>

                <div class="details">
                    <div class="content">
                        <h2>${item.text}</h2>
                        <p>My name is Blaah Blaah </p>
                    </div>

                </div>
            </div>
            `
            $gallery.append(str);
        }
    }

    var init = () => {
        loadImages();
    };


    return {
        init
    }
})();

switchModule.init();