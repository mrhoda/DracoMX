function DracoMXClient(SessionID) {
    //var sdomain = "http://41.132.136.166:8099/dracomx";
    //var sdomain = "http://192.168.1.109:8099/dracomx";
    var sdomain = "http://localhost:8888";
    var sessid = SessionID;
    this.createMessage = CreateMessage;
    this.openMessage = OpenMessage;
    this.userLogin = Login;
     
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
          
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
  
     
    function WaitOnGoInstantMsg(channelname) {
        alert("Wait on msg");
        var url = 'https://goinstant.net/mally123/smax';
        var token = '_vhu6FkMcAn8WNfzph1QzNxL3YSDg-HmgQap3w_qInlXZktTdOtvFxPdH2zI3FwU0L3X7wRdgCQcWUa1yGcRaQ';
        goinstant.connect(url, function (err, connection, room) {
            if (err) {
                alert('Error connecting to GoInstant:' + err.description);
                return;
            }

            //alert("App2: connected and in the lobby room.");
            var channel = room.channel(channelname);
            //alert('App2: channel open');
            //channel.message({ time: Date.now(), msg: 'hi'}, function(err) {
            //  if (err) {
            //    alert(' Messaging the channel was not successful!');
            //  }

            // alert('The message was sent!');
            channel.on('message', function (msg) {
                alert('Received a msg  -- ' + msg.msg);
            });
        });
    }
    function SendErrorResult(ErrorMsg, Done) {
        var Jsonresult = JSON.parse("{}");
        Jsonresult.result = "ERR";
        Jsonresult.msgname = "ErrorMsg";
        Jsonresult.msgpart = "ErrorMsgPart";
        Jsonresult.instanceid = "";
        Jsonresult.content = "<div><h1>" + ErrorMsg + "</h1></div>";
        Done(JSON.stringify(Jsonresult));
    }
    function Login(UserName, Password, Done) {
      
        try {
            var PostData = JSON.parse('{"op" : "login", "username" : "' + UserName + '","password" : "' + escape(Password) + '"}');
        }
        catch (err) {
            //$("#t1").val('Login:PostData JSON parse error - ' + err);
            SendErrorResult('PostData JSON parse error - ' + err.description, Done);
            return;
        }
        //$("#t1").val('=====' + HrefLink); 
        $.support.cors = true;
        $.ajax
            ({
                type: "POST",
                //async: false,
                url: sdomain + "/DracoEngine.aspx",
                dataType: "text",
                //contentType: 'application/x-www-form-urlencoded',
                crossDomain: true,
                data: PostData,
                beforeSend: function (x) {
                    if (x && x.overrideMimeType) {
                        // x.overrideMimeType("application/j-son;charset=UTF-8");
                        x.overrideMimeType("text/plain");
                    }
                    //x.setRequestHeader("Access-Control-Allow-Origin", "*");
                    //x.setRequestHeader("Origin", "http://localhost*");
                    x.setRequestHeader("Draco-SessionID", "login");
                    //x.setRequestHeader("Draco-TaskID", "99999999999999999999");
                    x.setRequestHeader("Draco-JSONRPC", "True");

                },
                success: function (result) {
                    //alert('result11111=' + result);
                    //$("#t1").val('@@@@@Create Message result ' + result);
                    //var MsgStruct = JSON.parse(result);
                    //$("#t1").val('@@@@@success---' + MsgStruct.instanceid); 
                    //localStorage["MsgStruct"] = result;
                    ////$("#dmxBody").append(MsgStruct.content);
                    //$("#dmxBody").html(MsgStruct.content);
                    //$("#dmxBody").trigger("create");
                    ////alert('creat msg part - ' + MsgStruct.msgpart);
                    Done(JSON.parse(result));
                },
                error: function (data) {
                    //alert('data=' + data);
                    //$("#t1").val('@@@@@@error---' + JSON.stringify(data)); 
                    Done(data);
                }
            })
    }

    function CreateMessage(MsgName, Parameters, Done) {
        if (Parameters == null || Parameters == "") {
            Parameters = '{}';

        }
        try {
            var p = JSON.parse(Parameters);
        }
        catch (err) {
            SendErrorResult('Params JSON parse error - ' + err.description, Done);
            return;
        }
        //alert("params " + Parameters);

        //$("#t1").val('----Create Message'); 
        try {
            var PostData = JSON.parse('{"op" : "createmsg", "msgname" : "' + MsgName + '","params" : "' + escape(Parameters) + '","formdata" : "no"}');
        }
        catch (err) {
            //$("#t1").val('CreateMessage:PostData JSON parse error - ' + err);
            SendErrorResult('PostData JSON parse error - ' + err.description, Done);
            return;
        }
        //$("#t1").val('=====' + HrefLink); 
        $.support.cors = true;
        $.ajax
            ({
                type: "POST",
                //async: false,
                url: sdomain + "/DracoEngine.aspx",
                dataType: "text",
                //contentType: 'application/x-www-form-urlencoded',
                crossDomain: true,
                data: PostData,
                beforeSend: function (x) {
                    if (x && x.overrideMimeType) {
                        // x.overrideMimeType("application/j-son;charset=UTF-8");
                        x.overrideMimeType("text/plain");
                    }
                    //x.setRequestHeader("Access-Control-Allow-Origin", "*");
                    //x.setRequestHeader("Origin", "http://localhost*");
                    x.setRequestHeader("Draco-SessionID", sessid);
                    //x.setRequestHeader("Draco-TaskID", "99999999999999999999");
                    x.setRequestHeader("Draco-JSONRPC", "True");

                },
                success: function (result) {
                    //alert('result11111=' + result);
                    //$("#t1").val('@@@@@Create Message result ' + result);
                    //var MsgStruct = JSON.parse(result);
                    //$("#t1").val('@@@@@success---' + MsgStruct.instanceid); 
                    //localStorage["MsgStruct"] = result;
                    ////$("#dmxBody").append(MsgStruct.content);
                    //$("#dmxBody").html(MsgStruct.content);
                    //$("#dmxBody").trigger("create");
                    ////alert('creat msg part - ' + MsgStruct.msgpart);
                    Done(JSON.parse(result));
                },
                error: function (data) {
                    //alert('data=' + data);
                    //$("#t1").val('@@@@@@error---' + JSON.stringify(data)); 
                    Done(data);
                }
            })
    }
    function OpenMessage(MsgName, MsgInstanceID, Parameters, Done) {
        
        if (Parameters == null || Parameters == "") {
            Parameters = '{}';
        }
        try {
            var p = JSON.parse(Parameters);
        }
        catch (err) {
            SendErrorResult('Params JSON parse error - ' + err.description, Done);
            return;
        }
        //$("#t1").val('@@@@@Open Message'); 
        //var MsgStruct = JSON.parse(localStorage["MsgStruct"]);
        //if (MsgStruct == null)
        //{
        //    alert("null msgstruct");
        //}
        //if (MsgName == null || MsgName == '' ) 
        //{
        //    MsgName = MsgStruct.msgname;
        //    MsgInstanceID = MsgStruct.instanceid;

        //}
        //alert("hello ---------- " + MsgStruct.msgpart + "," + MsgInstanceID);
        //var FormData = $('#' + MsgStruct.msgpart).serializeObject();
        ///////alert('formid ' + localStorage["formid"]);
        //var obj = $('#' + localStorage["formid"]);
        //alert('obj=' +obj);
        var FormData = $('#' + localStorage["formid"]).serializeObject();
        //////////alert("FormData 1 ----> " + FormData);
        FormData = JSON.stringify(FormData);
        //////////alert("FormData 2 ----> " + FormData);
        FormData = FormData.replace('{','');
        //////////////alert("FormData 3 ----> " +FormData);
        if (FormData == null || FormData == '}')
        {
            FormData = '"formdata" : "no"}';
        }
        else
        {
            FormData = FormData.replace('}','');
            FormData += ',"formdata" : "yes"}';
        }
        //var FormData = '"formdata" : "no"}';
        //////////////alert("FormData 4 ----> " + FormData);
        try {
            var PostData = JSON.parse('{"op" : "openmsg", "msgname" : "' + MsgName + '","msginstanceid" : "' + MsgInstanceID + '","params" : "' + escape(Parameters) + '",' + FormData);
        }
        catch (err) {
            //$("#t1").val('OpenMessage:PostData JSON parse error - ' + err);
            SendErrorResult('PostData JSON parse error - ' + err.description, Done);
            return;
        }
        //alert("postdata--" + JSON.stringify(PostData));

        //$("#t1").val('=====' + HrefLink); 
        $.support.cors = true;
        $.ajax
            ({
                type: "POST",
                url: sdomain + "/DracoEngine.aspx",
                dataType: "text",
                //contentType: 'application/x-www-form-urlencoded',
                crossDomain: true,
                data: PostData,
                beforeSend: function (x) {
                    if (x && x.overrideMimeType) {
                        // x.overrideMimeType("application/j-son;charset=UTF-8");
                        x.overrideMimeType("text/plain");
                    }
                    //x.setRequestHeader("Access-Control-Allow-Origin", "*");
                    //x.setRequestHeader("Origin", "http://localhost*");
                    x.setRequestHeader("Draco-SessionID", sessid);
                    //x.setRequestHeader("Draco-TaskID", "99999999999999999999");
                    x.setRequestHeader("Draco-JSONRPC", "True");

                },
                success: function (result) {
                    //$("#t1").val('@@@@@OPEN success---' ); 
                    //var prevMsgStruct = JSON.parse(localStorage["MsgStruct"]);

                    //var MsgStruct = JSON.parse(result);
                    //$("#t1").val('@@@@@success---' + MsgStruct.instanceid); 
                    //localStorage["MsgStruct"] = result;
                    //var ID = $('#dmx' +MsgStruct.msgpart);
                    ////alert("--ID - " + ID.val());
                    //if (MsgStruct.msgpart != prevMsgStruct.msgpart)
                    //{
                    //    alert("append - " + MsgStruct.msgpart);
                    //    $("#dmxBody").append(MsgStruct.content);
                    //}
                    //else
                    //{
                    //    alert("update - " + MsgStruct.msgpart);
                    //    $('#dmx' +MsgStruct.msgpart ).html(MsgStruct.content);
                    //}

                    ////$("#dmxBody").html(MsgStruct.content);
                    ////return JSON.parse(result);
                    Done(JSON.parse(result));

                },
                error: function (data) {
                    //alert((data));
                    //$("#t1").val('@@@@@@open error---' + JSON.stringify(data)); 
                    //return data;
                    Done(data);
                }
            })
    }
}