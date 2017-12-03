$(function(){
    /**
     * 子网分组转发算法
     * @author yin zheng
     * 2017/12/3
     */
    var flag=true;
    var Dx,N,P;
    $("#ip").keyup(function(){                              //使用正则表达式验证输入格式是否正确
        var reg=/^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}$/;
        var value=$("#ip").val();
        if(value){
            if(reg.test(value)==false){
                $(".prompting").show();
            }
            else{
                $(".prompting").hide();
            }
        }
    });
    $("#ensure").click(function(){
        var reg=/^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}$/;
        var value=$("#ip").val();                           //取得目的主机IP地址
        Dx=value;
        console.log(Dx);
        var flag=1;
        var A="";
        var B="";
        var C="";
        var D="";
        var E="";
        // P="255.255.255.196";       //length=11                      //计算N
        P=Dx;
        for(var i=0;i<P.length;i++){
            if(flag==1){
                if(P[i]=="."){
                    flag=2;
                    continue;
                }
                A+=P[i];
            }
            if(flag==2){
                if(P[i]=="."){
                    flag=3;
                    continue;
                }
                B+=P[i];
            }
            if(flag==3){
                if(P[i]=="."){
                    flag=4;
                    continue;
                }
                C+=P[i];
            }
            if(flag==4){
                if(P[i]=="."){
                    flag=4;
                    break;
                }
                D+=P[i];
            } 
        }
        function convertToBinary(num) {                //将数字转化为二进制，如果字符串长度不足8位，则补零到8位
            var result=num.toString(2);
            while(result.length<8){
                result="0"+result;
            }
            return result;
        }
        A=parseInt(A,10);
        A=convertToBinary(A);
        B=parseInt(B,10);
        B=convertToBinary(B);
        C=parseInt(C,10);
        C=convertToBinary(C);
        D=parseInt(D,10);
        D=convertToBinary(D);
        console.log(A);
        console.log(B);
        console.log(C);
        console.log(D);
        // for(var k=0;k<8;k++){
        //     var x=A[k]*D[k];
        //     E+=x;
        // }
        // console.log(E);
    });
   
});