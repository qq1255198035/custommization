import Loading from "./Loading.vue";

let instance = null;
export default{
    // eslint-disable-next-line
    install(Vue,options){
        if(!instance){
            let MyLoadingComponent = Vue.extend(Loading);
            instance = new MyLoadingComponent({
                el: document.createElement('div')
            })
            document.body.appendChild(instance.$el)
        }
        instance.isShow = false;
        let customMethods = {
            show(){
                instance.isShow = true
            },
            hide(){
                instance.isShow = false
            }
        }
        if(!Vue.$vLoading){
            Vue.$vLoading = customMethods
            Vue.prototype.$vLoading = Vue.$vLoading
        }else{
            console.log('被占用')
        }
    }
}