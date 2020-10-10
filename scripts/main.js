var switchModule = (function () {
    var imageList =[];
    var imageCount = 17;  //count of images to load
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
            obj['text'] = "Image " + i;
            obj['info'] = links[i].split("breeds").pop().split("/")[1];
            imageList.push(obj);
        }
        addImages();
    };

    var addImages = () =>{

        $gallery.empty();
        if(imageList.length !== 0){
            for(let item of imageList){
                var str = '';
                str = `
                <div class="single-img normalImage">
                    <div class="imgBox ">
                        <img class="" src="${item.imageUrl}" alt="">
                    </div>
    
                    <div class="details">
                        <div class="content">
                            <h2>${item.info.toUpperCase()}</h2>
                            <button id="${item.index}">Delete</i></button>  
                        </div>
    
                    </div>
                </div>
                `
                $gallery.append(str);
            }
            eventListerners();
        } else{
            $gallery.append("<div><h1>No images to show. Please reload.</h1></div>");
        }
        
    }

    var eventListerners= ()=>{
        $("#gallery button").off("click");
        $("#gallery button").on("click", (event) => {
        
            var id = $(event.target).attr("id");
            var filteredPeople = imageList.filter((obj)=>{
                if(obj.index == id){
                    return false;
                }else{
                    return true;
                }
            });
            imageList = filteredPeople;
            addImages();
        });

        $("#spinGallery").off("click");
        $("#spinGallery").on("click",()=>{
            imageList.sort(() => Math.random() - 0.5);
            addImages();
        });
    };

    var init = () => {
        loadImages();
    };


    return {
        init
    }
})();

switchModule.init();