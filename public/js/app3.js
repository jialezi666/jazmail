function getParameterByName(t, e = window.location.href) {
    t = t.replace(/[\[\]]/g, "\\$&");
    var o = new RegExp("[?&]" + t + "(=([^&#]*)|&|#|$)").exec(e);
    return o ? o[2] ? decodeURIComponent(o[2].replace(/\+/g, " ")) : "": null
}
function change(obj){
var value = $(obj).find('option:selected').val().toLowerCase();
window.location.href='http://mail.0du.win/?mailhost='+value;
}
$(function(){
    $(".baslik").on("click", (function() {
        var t = $(this).next("ul");
        t.hasClass("acik") ? t.removeClass("acik") : t.addClass("acik")
    }
    ));
  $('.ui.modal')
    .modal()
  ;
  a = [];
  var clipboard = new Clipboard('.copyable');
  $customShortId = $('#customShortid');
  $shortId = $('#shortid');
  $mailSuffix = $('#mailsuffix');
  $customTheme = 'check';
  $placeholder_old = '请等待分配临时邮箱';
  $placeholder_new = '请输入不带后缀邮箱账号';
  $mailsuffixContaienr = $("#mailsuffix_container"),
  $indexContaienr = $("#index_container"),
  $customShortId.on("click", (function() {
        var t = $(this);
        if ($shortId.removeAttr("readonly"),
        t.hasClass("edit"))
            $shortId.val(""),
            t.removeClass("edit"),
            t.toggleClass($customTheme),
            t.find("em.custom_btn").hide(),
            t.find("em.confirm_btn").show(),
            $placeholder_old = $shortId.prop("placeholder"),
            $shortId.prop("placeholder", $shortId.attr("editplaceholder"));
        else {
            $shortId.attr("readonly", "true"),
            t.removeClass("check"),
            t.find("em.custom_btn").show(),
            t.find("em.confirm_btn").hide(),
            t.toggleClass("edit"),
            $shortId.prop("placeholder", $placeholder_old),
            $mailUser = $shortId.val().toLowerCase();
            var e = $mailUser + "@" + $shortId.prop( "mailsuffix" );
            setMailAddress($mailUser);
            $shortId.val(e);
            window.location.reload()
        }
    })),
    $("#customSuffix").on("click", (function() {
		var t = $(this);
        if ($mailSuffix.removeAttr("readonly"),
        t.hasClass("edit"))
			$mailsuffixContaienr.addClass("goster"), 
			$indexContaienr.removeClass("goster"),
            $mailSuffix.val(""),
            t.removeClass("edit"),
            t.toggleClass($customTheme),
            t.find("em.custom_btn").hide(),
            t.find("em.confirm_btn").show(),
            $placeholder_old = $mailSuffix.prop("placeholder"),
            $mailSuffix.prop("placeholder", $mailSuffix.attr("editplaceholder"));
        else {
            $mailSuffix.attr("readonly", "true"),
            t.removeClass("check"),
            t.find("em.custom_btn").show(),
            t.find("em.confirm_btn").hide(),
            t.toggleClass("edit"),
            $mailSuffix.prop("placeholder", $placeholder_old),
            $mailHost = $mailSuffix.val().toLowerCase();
            window.location.href='http://mail.0du.win/?mailhost='+$mailHost;
        }
    })),
    $maillist = $("#maillist"),
    $("#back").on("click", (function() {
        $("#panel2").hide(),
        $("#panel1").show()
    }
    )),
    $("#plain").on("click", (function() {
        $("#content").hide(),
        $("#rawcontent").show(),
        Prism.highlightAll()
    }
    ));
  var socket = io();
  var setMailAddress = function(id) {
    localStorage.setItem('shortid', id);
	var mailhost = getParameterByName("mailhost");
	if (mailhost == null || mailhost == "") { 
	var mailhost = location.hostname
	};
    var mailaddress = id + '@' + mailhost;
    $('#shortid').val(mailaddress).parent().siblings('button').find('.mail').attr('data-clipboard-text', mailaddress);
  };
  $('#refreshShortid').click(function() {
    socket.emit('request shortid', true);
  });

  socket.on('connect', function() {
    if(('localStorage' in window)) {
      var shortid = localStorage.getItem('shortid');
      if(!shortid) {
        socket.emit('request shortid', true);
      }
      else {
        socket.emit('set shortid', shortid);
      }
    }
  });
  socket.on('shortid', function(id) {
    setMailAddress(id);
  });
  socket.on("mail", (function(mail) {
        $li = $('<li class="mail active">').data("mail", mail),
        $link = $('<a href="javascript:void(0)">'),
//        $link.append('<div class="avatar"><img src="images/posta.png"></div>').append($('<div class="gonderen">').text(mail.headers.from)).append($('<div class="baslik">').text(mail.headers.subject || "None")).append('<div class="zaman"><img src="images/arrow-right.png"></div>'),
        $link.append('<div class="avatar"><img src="images/posta.png"></div>').append($('<div class="gonderen">').text(mail.from)).append($('<div class="baslik">').text(mail.subject || "None")).append('<div class="zaman"><img src="images/arrow-right.png"></div>'),
        $li.append($link),
        $li.on("click", "a", (function() {
//            console.log(mail.headers.from),
			console.log(mail.from),
//            $("#summary").html("&lt;" + mail.headers.from + "&gt; <strong>" + (mail.headers.subject || "None") + "</strong>"),
            $("#summary").html("&lt;" + mail.from + "&gt; <strong>" + (mail.subject || "None") + "</strong>"),
            $("#content").html(mail.html),
            $("#content").show(),
            $("#rawcontent").html($("<pre>").html($("<code>").addClass("language-json").html(JSON.stringify(mail, null, 2)))),
            $("#rawcontent").hide(),
            $("#panel1").hide(),
            $("#panel2").show()
        }
        )),
        $maillist.after($li),
        $("#emptybox").hide()
    }
    ));

  socket.on('stat', function(stat) {
      //console.log(stat);
      $('.mailcount').html(stat.mail);
      $('.boxcount').html(stat.box);
      $('.onlinecount').html(stat.online);
      $('.usercount').html(stat.user);
      var seconds = 1000;
      var minutes = seconds * 60;
      var hours = minutes * 60;
      var days = hours * 24;
      var years = days * 365;
      var today = new Date();
      var stime = new Date(stat.stime);
      var t1 = Date.UTC(stime.getFullYear(),stime.getMonth()+1,stime.getDate(),stime.getHours(),stime.getMinutes(),stime.getSeconds());
      var t2 = Date.UTC(today.getFullYear(),today.getMonth()+1,today.getDate(),today.getHours(),today.getMinutes(),today.getSeconds());
      var diff = t2-t1;
      var diffYears = Math.floor(diff/years);
      var diffDays = Math.floor((diff/days)-diffYears*365);
      var diffHours = Math.floor((diff-(diffYears*365+diffDays)*days)/hours);
      var diffMinutes = Math.floor((diff-(diffYears*365+diffDays)*days-diffHours*hours)/minutes);
      var diffSeconds = Math.floor((diff-(diffYears*365+diffDays)*days-diffHours*hours-diffMinutes*minutes)/seconds);
      document.getElementById("sitetime").innerHTML="已运行 "+diffYears+"年"+diffDays+"天"+diffHours+"小时"+diffMinutes+"分钟"+diffSeconds+"秒";
  });
});

