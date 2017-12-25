# homeworkInternet
计算机网络期末大作业<br>
模拟子网分组转发<br>

















一．实验目的
了解子网分组转发算法并能够用C语言模拟。
二．实验环境
    
三．实验内容
1.	使用web前端静态页面模拟IP分组转发算法
2.	2.本次实验需要了解IP分组转发算法，即分组转发算法如下：
（1）	从收到的分组的首部提取目的 IP 地址 D。
（2）	先用各网络的子网掩码和D逐比特相“与”，看是否和相应的网络地址匹配。若匹配，则将分组直接交付。否则就是间接交付，执行(3)。
（3）	若路由表中有目的地址为 D的特定主机路由，则将分组传送给指明的下一跳路由器；否则，执行(4)。
（4）	对路由表中的每一行的子网掩码和 D逐比特相“与”，若其结果与该行的目的网络地址匹配，则将分组传送给该行指明的下一跳路由器；否则，执行(5)。
（5）	若路由表中有一个默认路由，则将分组传送给路由表中所指明的默认路由器；否则，执行(6)。
（6）	报告转发分组出错。
3. 先计算目的IP地址&&子网掩码得到的网络地址与本子网网络地址进行比较若相同，说明该主机在本网络上，直接交付
    否则 交由路由器间接交付
    将本子网子网掩码与分组的IP地址按位与，将得出的网络地址与路由表目的网络地址比较
    若一致，说明该子网是要寻找的目的网络
否则，继续向下一行比较
具体操作界面如下：
步骤1
将已知的R1中的路由表填入，并点击确认R1路由表
 

步骤2
填入H1子网掩码，H1要发送的分组的目的IP地址，H1的地址
点击开始，开始模拟
 
具体代码如下：(js)
$(function(){
    /**
     * 子网分组转发算法
     * @author yin zheng
     * 2017/12/3
     */
    
    function convertToBinary(num) {                //将数字转化为二进制，如果字符串长度不足8位，则补零到8位
        var result=num.toString(2);
        while(result.length<8){
            result="0"+result;
        }
        return result;
    }

    function cal(num1,num2){                       //子网掩码与目标网络地址按位与运算
        var res="";
        var P=num1;
        var flag=1;
        var A=""; var B=""; var C=""; var D="";
        var A2=""; var B2=""; var C2=""; var D2=""; 
        var E1=""; var E2=""; var E3=""; var E4="";
        //以下代码以 . 为分割，提取出数字
        for(var i=0;i<P.length;i++){                                  //先将255.255.255.128转化为255 255 255 128
            if(flag==1){                                              //再将255 255 255 128转化为二进制
                if(P[i]=="."){                                        //然后子网掩码与目标网络地址按位与运算
                    flag=2;                                           //
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
        A=parseInt(A,10); A=convertToBinary(A);
        B=parseInt(B,10); B=convertToBinary(B);
        C=parseInt(C,10); C=convertToBinary(C);
        D=parseInt(D,10); D=convertToBinary(D);
        var flag2=1;
        for(var i=0;i<num2.length;i++){                                 
            if(flag2==1){                                             
                if(num2[i]=="."){                                        
                    flag2=2;                                           
                    continue;
                }
                A2+=num2[i];
            }
            if(flag2==2){
                if(num2[i]=="."){
                    flag2=3;
                    continue;
                }
                B2+=num2[i];
            }
            if(flag2==3){
                if(num2[i]=="."){
                    flag2=4;
                    continue;
                }
                C2+=num2[i];
            }
            if(flag2==4){
                if(num2[i]=="."){  
                    break;
                }
                D2+=num2[i];
            } 
        }
        A2=parseInt(A2,10); A2=convertToBinary(A2);
        B2=parseInt(B2,10); B2=convertToBinary(B2);
        C2=parseInt(C2,10); C2=convertToBinary(C2);
        D2=parseInt(D2,10); D2=convertToBinary(D2);
        for(var k=0;k<8;k++){
            var x=A[k]*A2[k];
            E1+=x;
        }
        for(var k=0;k<8;k++){
            var x=B[k]*B2[k];
            E2+=x;
        }
        for(var k=0;k<8;k++){
            var x=C[k]*C2[k];
            E3+=x;
        }
        for(var k=0;k<8;k++){
            var x=D[k]*D2[k];
            E4+=x;
        }
        E1=parseInt(E1,2);
        E2=parseInt(E2,2);
        E3=parseInt(E3,2);
        E4=parseInt(E4,2);
        res=E1+"."+E2+"."+E3+"."+E4;
        return res;
    }
    $(".address").keyup(function(){                              //使用正则表达式验证输入格式是否正确
        
        var top=$(this).offset().top+30;
        var left=$(this).offset().left;
   
        $(".prompting").css("left",left);
        $(".prompting").css("top",top);
        var reg=/^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}$/;
        var value=$(this).val();
        
        if(value){
            if(reg.test(value)==false){
               
                $(".prompting").show();

            }
            else{
                $(".prompting").hide();
            }
        }
    });

    var yanma0,yanma1,yanma2,yanma3;
    var x,x0,x1,x2,x3;
    var nex1,nex2,nex3;
    $("#set").click(function(){                              //确定路由表
        var value=$("#ip1").val();                           //取得目的主机IP地址
        x1=value;                                            //Dx目的主机IP地址
        value=$("#yanma1").val();                            //取得掩码
        yanma1=value;
        value=$("#ip2").val(); 
        x2=value;
        value=$("#yanma2").val();
        yanma2=value;
        value=$("#ip3").val();
        x3=value;
        value=$("#yanma3").val();
        yanma3=value;
        nex1=$("#next1").val();
        nex2=$("#next2").val();
        nex3=$("#next3").val();
        $("#readNext1").val(nex1);
        $("#readNext2").val(nex2);
        $("#readNext3").val(nex3);
        $("#readIp1").val(x1);
        $("#readYan1").val(yanma1);
        $("#readIp2").val(x2);
        $("#readYan2").val(yanma2);
        $("#readIp3").val(x3);
        $("#readYan3").val(yanma3);
    });
    function judge(str1,str2){
        var flag=true;
        for(var i=0;i<str1.length;i++){
            if(str1[i]!=str2[i]){
                flag=false;
                break;
            }
        }
        return flag;
    }
    var N;
    $("#ensure").click(function(){                            //开始计算
        
        var temp;
        x=$("#me").val();
        x0=$("#ip0").val();
        yanma0=$("#yanma0").val();
        //Dx目的IP地址 P掩码 N计算出的本机网络地址 X本机网络地址
        N=cal(x0,yanma0);
        var begin="开始路由选择....";
        $("#show").append("<li>"+begin+"</li>");
        $("#show").append("<li>目的主机IP</li>");
        $("#show").append("<li>"+x0+"</li>");
        $("#show").append("<li>掩码</li>");
        $("#show").append("<li>"+yanma0+"</li>");
        $("#show").append("<li>计算得到</li>");
        $("#show").append("<li>"+N+"</li>");
        $("#show").append("<li>H1的网络地址为</li>");
        $("#show").append("<li>"+x+"</li>");
        if(judge(N,x)){
            $("#show").append("<li>直接交付</li>");
        }
        else{
            $("#show").append("<li>不一致，从R1转发</li>");
            temp=cal(yanma1,N);
            $("#show").append("<li>计算得到</li>");
            $("#show").append("<li>"+temp+"</li>");
            $("#show").append("<li>第1项的网络地址为</li>");
            $("#show").append("<li>"+x1+"</li>");
            if(judge(temp,x1)){

                $("#show").append("<li>从"+nex1+"交付</li>");
            }
            else{
                $("#show").append("<li>不一致，继续向下...</li>");
                temp=cal(yanma2,N);
                $("#show").append("<li>计算得到</li>");
                $("#show").append("<li>"+temp+"</li>");
                $("#show").append("<li>第2项的网络地址为</li>");
                $("#show").append("<li>"+x2+"</li>");
                if(judge(temp,x2)){
                    $("#show").append("<li>从"+nex2+"交付</li>");
                }
                else{
                    $("#show").append("<li>不一致，继续向下...</li>");
                    temp=cal(yanma3,N);
                    $("#show").append("<li>计算得到</li>");
                    $("#show").append("<li>"+temp+"</li>");
                    $("#show").append("<li>第3项的网络地址为</li>");
                    $("#show").append("<li>"+x3+"</li>");
                    if(judge(temp,x3)){
                        $("#show").append("<li>从"+nex3+"交付</li>");
                    }
                    else{
                        $("#show").append("<li>分组转发出错</li>");
                    }
                }
            }
        }
    });
});

四．实验结果
模拟结果：
 
五．实验体会
通过本次试验了解了IP分组转发算法，并结合相关知识使用web前端开发技术进行模拟。 







