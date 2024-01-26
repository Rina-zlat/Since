function StartButtonPress() {
    console.log('StartButtonPress');
    if (!timer_on) {
        console.log('timer run');
        timer_on = true;
        setTimeout("AddSecond();", 10);
    }
    second = 0;
    u = 0;
    x1 = 0;
    t1 = 0;
    cx = min_padding;
}

function StopButtonPress() {
    console.log('StopButtonPress');
    //second = 0;
    timer_on = false;
}

var timer_on = false;
var second = 0;

function AddSecond() {
    if (timer_on) {

        second = second + 1;
        setTimeout("AddSecond();", 10);

        var m = parseInt(second /100 / 60 % 60);
        var s = parseInt(second /100 % 60);
        var t = parseInt(second % 100);

        m = leadZero(m);
        n = leadZero(s);
        t = leadZeroForT(t*10);

        var str = m + ':' + n + '.' + t;

        console.log('timer tick = ' + str);

        var elmnt = document.getElementById('timer');
        if (elmnt == null) {
            console.log('cant find timer');
        }
        else {
            elmnt.textContent = str;
        }

        move();
    }
}

function leadZero(num) {
    var s = "" + num;
    if (s.length < 2) {
        s = "0" + s;
    }
    return s;
}

function leadZeroForT(num) {
    var s = "" + num;
    if (s.length < 3) {
        s = "0" + s;
    }
    else
    if (s.length < 2) {
        s = "00" + s;
    }

    return s;
}

function area1_checked() {

    var elmnt1 = document.getElementById('select1');
    var elmnt2 = document.getElementById('select2');

    if (elmnt1 == null) {
        console.log('cant find select1');
    }
    else {
        elmnt1.hidden = false;
        elmnt2.hidden = true;
    }

    select_change();
}

function area2_checked() {
    var elmnt1 = document.getElementById('select1');
    var elmnt2 = document.getElementById('select2');

    if (elmnt2 == null) {
        console.log('cant find select2');
    }
    else {
        elmnt1.hidden = true; false;
        elmnt2.hidden = false;
    }

    select_change();
}

var min_padding = 270;
var max_padding = 705;

var u = 0;
var x1 = 0;
var t1 = 0;
var cx = min_padding;

function move()
{
    select_change();

    var m = 1.2;//кг
    m = document.getElementById('myRange').value/1000;

    var p = 7800;//кг/м3

    var v = m/p;//м3
    var g = 9.8;//м/с/с

    var pi = 3.1415926;
    var r = Math.cbrt(v/4*3/pi);//м
    document.getElementById('radiusss').innerText = "Радиус (см): " + (Math.round(r*1000)/10);

    var viazkost = 1;//мПа*с
    var plotnost = 1000;//кг/м3
    if (liquid == "liquid1")
    {
        viazkost = 0.306;
        plotnost = 784;
    }
    else
    if (liquid == "liquid2")
    {
        viazkost = 0.894;
        plotnost = 1000;
    }
    else
    if (liquid == "liquid3")
    {
        viazkost = 985;
        plotnost = 0.000959;
    }
    else
    if (liquid == "liquid4")
    {
        viazkost = 1490;
        plotnost = 1260;
    }
    
    var umax = 1000*2/9*r*r*g*(p-plotnost)/viazkost;

    //var f = 5;//15.5;//Н
    //var k = viazkost/2000;
    f = g*m * (1 - u/umax);
    //var x = min_padding;
    var a = f/m;
    //x = min_padding + a*second*second/2/10000;

    u = a*second/100;

    if(u>umax || x1 != 0)
    {
        if (x1 == 0)
        {
            t1 = (second-1)/100;
            if (t1<1)
            {
                t1 = 1;
            }
            //x1 = min_padding+(a*(t1)*(t1)/2);
            //var dx = a*(t1)*(t1)/2;
            x1 = cx;
        }
        u = umax;

        x = cx + u*(second/100 - t1);
    }
    else
    {
        //x = min_padding+(a*(t1)*(t1)/2);
        var dx = u*(1/100) + a*(1/100)*(1/100)/2;
        x = cx+dx;
        cx = x;
    }
    

    if(x > max_padding)
    {
        x = max_padding;
        timer_on = false;
    }

    var c3 = document.getElementById('crcl');

    var ptxt = ""+x+"px";
    console.log('u=' + u);
    console.log('umax=' + umax);
    console.log('r=' + r + ' p=' + p + ' plotnost=' + plotnost + ' viazkost=' + viazkost);
    console.log('x=' + x);
    console.log('x1=' + x1);
    console.log('t1=' + t1);
    console.log('s=' + (max_padding-min_padding));
    c3.style.paddingTop = ptxt;
    
}

var liquid = "liquid3";

function select_change()
{
    console.log('выбор типа');

    var elmnt1 = document.getElementById('select1');
    var elmnt2 = document.getElementById('select2');

    if (elmnt2.hidden)
    {
        console.log('выбор 1 ' + elmnt1.value);
        liquid = elmnt1.value;
    }
    else
    {
        console.log('выбор 2 ' + elmnt2.value);
        liquid = elmnt2.value;
    }


}