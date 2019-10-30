function Secret_Key(str){
    var o={
        str :str,
        ary:[],
        aol:[],
        reg:/[z]/g,
        rgo:/[y]/g,
        change:function(){
            var this_=this,s="",sl=this.str.length;
            this.str =this.str.split("").reverse().join("") ;//先反转
            var posl =[Math.floor(sl / 5),Math.floor(sl / 3),Math.floor(sl / 6),Math.floor(sl / 2.4)] ;
            for(var i=0;i<posl.length;i++){
                var sPos = posl[i];
                var upstr="";
                if(isNaN(Number(this.str[sPos]))){
                    upstr = this.str[sPos].toUpperCase();
                }else{
                    upstr = Number(this.str[sPos])+5+""; 
                };
                var a2 = this.str.split("");
                a2[sPos] = upstr;
                this.str = a2.join("");
            };
            this.ary = this.str.split("");
            //奇书偶数的互换位置
            this.ary.forEach(function(item,index){
                if(index%2){ //偶数
                    return;
                }else{
                    if(index+1<this_.ary.length-1){
                        var centernum = this_.ary[index+1];
                        this_.ary[index+1]= this_.ary[index];
                        this_.ary[index] = centernum;
                    };
                };
            });
            this.str = this.ary.join("");
            this.str = btoa(encodeURIComponent(this.str)); //base64
            this.str = this.str.replace(this.reg,function(){  //将z替换
                return "m!@"
            });
            this.str = btoa(encodeURIComponent(this.str));//再次base64
            this.str = this.str.substring(0,16);
            console.log(this.str)
            var k = CryptoJS.enc.Utf8.parse("1234567812345678");
            var iv  = CryptoJS.enc.Utf8.parse("0123456789ABCDEF");
            console.log(CryptoJS.mode)
            var encryptedData = CryptoJS.AES.encrypt(this.str, k, {
                mode: CryptoJS.mode.CFB,
                iv:iv,
                // padding: CryptoJS.pad.Pkcs7
                // padding:CryptoJS.pad.NOPADDING
            });
            this.str = ""+encryptedData;
            this.aol = this.str.replace(this.rgo,"$o$").split("");
            var len = this.aol.length,
            middlenum=parseInt(len/2);
            // 前后的互换位置
            this.aol.forEach(function(item,index){
                if(len>6&&index<len-6&&index<middlenum){
                    var changeindex = len-index-6;
                    var middle = this_.aol[changeindex];
                    this_.aol[changeindex] = this_.aol[index];
                    this_.aol[index] = middle;
                }
            });
            this_.str = btoa(encodeURIComponent(this.aol.reverse().join("")));
            var k2 = CryptoJS.enc.Utf8.parse("8765432187654321");
            var encryptedData2 = CryptoJS.AES.encrypt(this.str, k2,{
                iv:iv,
                mode: CryptoJS.mode.CFB,
                // padding: CryptoJS.pad.Pkcs7
                // padding:CryptoJS.pad.NOPADDING
            });
            this_.str = ""+encryptedData2;
            console.log(this.str)
        },
        enFn:function(params){
            var this_ = this;
            var key = CryptoJS.enc.Utf8.parse('9Ur5KJmEpWudwhbIdIz1FZsn2woSAKjZoRiURKniH/yuYrEG4wIKGTuP+4bUpVdtXcSJdwF3rVCljLCqcKPh7i8wclbagt7no4IJtaHxwMDkBz9a7LRAjoU0yQvNsFzRVjhTpHxUf/dKb3XlTKlugP0E7E6Qeb5k28wuwnFHl2q0XtvLHOwjEKWDqy73kL/Mznv/aJFKRFdTS/pcIJsX4feHSkmw7cBukXIYg0R8OwlWXEzRfS/vo2XfcBmncV6N');
            var encryptedData = CryptoJS.AES.encrypt(params, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            encryptedData = encryptedData.ciphertext.toString();
            console.log(""+encryptedData)
            var encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedData);
            var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
            // var key2="9Ur5KJmEpWudwhbIdIz1FZsn2woSAKjZoRiURKniH/yuYrEG4wIKGTuP+4bUpVdtXcSJdwF3rVCljLCqcKPh7i8wclbagt7no4IJtaHxwMDkBz9a7LRAjoU0yQvNsFzRVjhTpHxUf/dKb3XlTKlugP0E7E6Qeb5k28wuwnFHl2q0XtvLHOwjEKWDqy73kL/Mznv/aJFKRFdTS/pcIJsX4feHSkmw7cBukXIYg0R8OwlWXEzRfS/vo2XfcBmncV6N"
            var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
            console.log("解密后:"+decryptedStr);
          
            
            
        },
        // backfn:function(value){
        //     var this_ = this;
        //     var encryptedData2 =value.ciphertext.toString();
        //     var encryptedHexStr2 = CryptoJS.enc.Hex.parse(encryptedData2);
        //     var encryptedBase64Str2 = CryptoJS.enc.Base64.stringify(encryptedHexStr2);
        //     var k2= CryptoJS.enc.Utf8.parse("8765432187654321");
        //     var decryptedData2 = CryptoJS.AES.decrypt(encryptedBase64Str2,k2 , {
        //         mode: CryptoJS.mode.ECB,
        //         padding: CryptoJS.pad.Pkcs7
        //     });
        //     value = decryptedData2.toString(CryptoJS.enc.Utf8);
        //     console.log(value)
        //     value = atob(decodeURIComponent(value));
            
        //     var ary = value.split("").reverse();
        //     var len = ary.length,
        //     middlenum=parseInt(len/2);
        //     ary.forEach(function(item,index){
        //         if(len>6&&index<len-6&&index<middlenum){
        //             var changeindex = len-index-6;
        //             var middle = this_.aol[changeindex];
        //             this_.aol[changeindex] = this_.aol[index];
        //             this_.aol[index] = middle;
        //         };
        //     });
        //     var rego = /$o$/g;
            
        //     value = ary.join("").replace(rego,"y");
        //     console.log(value)
        //     var encryptedData =value.ciphertext.toString();
        //     var encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedData);
        //     var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        //     var key = CryptoJS.enc.Utf8.parse("1234567812345678");
        //     var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str,key , {
        //         mode: CryptoJS.mode.ECB,
        //         padding: CryptoJS.pad.Pkcs7
        //     });
        //     value = decryptedData.toString(CryptoJS.enc.Utf8);
        //     // console.log("解密后:"+decryptedStr);
        //     value = atob(decodeURIComponent(value));
        //     var reg = /m!@/g,backary=[];
        //     value = value.replace(reg,function(){
        //         return "z";
        //     });
        //     value = atob(decodeURIComponent(value));
        //     backary = value.split("");
        //     //奇书偶数的互换位置
        //     backary.forEach(function(item,index){
        //         if(index%2){ //偶数
        //             return;
        //         }else{
        //             var centernum = backary[index+1];
        //             backary[index+1]= backary[index];
        //             backary[index] = centernum;
        //         };
        //     });
        //     for(var i=0;i<backary.length;i++){
        //         switch(i){
        //             case i<10:
        //             backary[i] = backary[i].toLowerCase();
        //             break;
        //             case i>12&&i<18:
        //             backary[i] = backary[i].toUpperCase();
        //             break;
        //             default:
        //             break;
        //         }
        //     };
        //     value = backary.reverse().join("");
        //     console.log(value)
    
        // }
    };
    return o;
}
Secret_Key("2fffa207bef3a7dcca8d8e6fa1c08c07").change();
// o.enFn(JSON.stringify({"name":"fanyajun","password":"123456"}));
// o.change();

// var key = CryptoJS.enc.Utf8.parse('1234567812345678');
// var plaintText =JSON.stringify({"name":"fanyajun","password":"123456"}); // 明文
// var encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
//   mode: CryptoJS.mode.ECB,
//   padding: CryptoJS.pad.Pkcs7
// });
// console.log("加密前："+plaintText);
// console.log("加密后："+encryptedData);


// encryptedData = encryptedData.ciphertext.toString();
// var encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedData);
// var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
// var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
//   mode: CryptoJS.mode.ECB,
//   padding: CryptoJS.pad.Pkcs7
// });
// var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
// console.log("解密后:"+decryptedStr);
//  var pwd = "PCsUFtgog9/qpqmqXsuCRQ==";
// //加密服务端返回的数据
// var decryptedData = CryptoJS.AES.decrypt(pwd, key, {
//   mode: CryptoJS.mode.ECB,
//   padding: CryptoJS.pad.Pkcs7
// });
// console.log("解密服务端返回的数据:"+decryptedStr);