/*
	22    0      4     888
   2  2  0 0    44    88 88
     2   0 0   4 4     888
	2    0 0  444444  88 88
   2222   0      4     888
   
Another 2048 by Zhang Jingye.
CopyRight(R) 2015

!!!NOTE: This is a NOT the original version of 2048!!!
You can play the original one at 
http://gabrielecirulli.github.io/2048/
which was in turn based on 1024 by Veewo Studio
and conceptually similar to Threes by Asher Vollmer.
 
This program is under GNU License.
You can use or change this code freely,
but you CANNOT modify or fake the author.

*/

//Initializing before the page loaded
if(document.ontouchend){var moveDisX=0;var moveDisY=0;}//For touch events
var zdx=5;//For default block zIndex
var score=0;
var lock=false;//For locking the keypress and array refresh
var tid=0;tidd=0;//For counting animation
var alldiv = new Array()/*Record all divs on the page*/
	,nums=new Array()/*Temporarily store the divs' value*/
var canmove=false;//For global verifying whether the user moves the div
var sch,scw;//Store the screen Width & Height
var highscore=0;
//Simulate the 2D array
//alldiv[i][o]->i stands on lines while o stands on row
for(i=1;i<=4;i++){alldiv[i]=new Array();}
window.onload=loaded;

//Window resize function
function rezise(){
	sch=document.body.clientHeight;
	scw=document.body.clientWidth;
	with($(all)[0]){
		if(sch<=scw){
			style.marginLeft=style.marginRight=(scw-sch*0.65)/2;
		}
		else{
			style.marginLeft=style.marginRight='5px';
		}
	}
	//The main block is in height of 65% sch
	//and the little block is in height of 22.5% <mainblock's height>
	$("center").css({"font-size":sch*0.65*0.225*.5,
					 "padding-top":sch*0.65*0.225*0.25});
	$("h1").css({"font-size":sch*0.1+'px',
				 "color": "#776e65",
				 "height": sch*0.067+'px'});
}

function loaded(){
	$(window).resize(rezise);
	rezise();//Move the elements to the right places
	//Make some little block to fake the background of the real block
	var alldiv_f=new Array();
	for(i=1;i<=16;i++){
		alldiv_f[i]=document.createElement('div');
		alldiv_f[i].style.backgroundColor="rgb(204, 192, 179)";
		alldiv_f[i].innerHTML="";
		alldiv_f[i].style.zIndex=0;
		alldiv_f[i].id="f"+i;
		alldiv_f[i].style.position="absolute";
		alldiv_f[i].style.borderRadius='3px';
		$(all).append(alldiv_f[i]);
	}
	for(i=1;i<=4;i++){
		//Width
		alldiv_f[4*i-3].style.left="2%";alldiv_f[4*i-3].style.right="75.5%";
		alldiv_f[4*i-2].style.left="26.5%";alldiv_f[4*i-2].style.right="51%";
		alldiv_f[4*i-1].style.left="51%";alldiv_f[4*i-1].style.right="26.5%";
		alldiv_f[4*i].style.left="75.5%";alldiv_f[4*i].style.right="2%";
		//Height
		alldiv_f[i].style.top="2%";alldiv_f[i].style.bottom="75.5%";
		alldiv_f[i+4].style.top="26.5%";alldiv_f[i+4].style.bottom="51%";
		alldiv_f[i+8].style.top="51%";alldiv_f[i+8].style.bottom="26.5%";
		alldiv_f[i+12].style.top="75.5%";alldiv_f[i+12].style.bottom="2%";
	}
	document.onkeyup=keyPr;
	document.ontouchstart=down;
	document.ontouchend=up;
	ref();
	if(readCookie('nums')===null){game_start();}
	else{
		nums=readCookie('nums').split(',');
		for(g=1;g<=16;g++){
			if(nums[g]=='-'){
				continue;
			}
			setNum(nums[g],Math.ceil(g/4),y(g));continue;
		}
		color_set();
	}
	if(readCookie('score')!==null){
		score=parseInt(readCookie('score'));
		highscore=readCookie('hscore');
		$(h2)[0].innerHTML="Score : "+score
			+"/"+highscore;
	}
}

function y(n){
	//This function is to return a number which point at horizontal block
	return (n%4==0)?4:n%4;
}

function ref(){
	//This function is to refresh the divs elements to nums array
	if(!lock){for(i=1;i<=16;i++){
		if(!alldiv[Math.ceil(i/4)][y(i)]){nums[i]='-';continue;}
		nums[i]=alldiv[Math.ceil(i/4)][y(i)].childNodes[0].innerHTML;
	}}
}

function game_start(){
	clear_all();
	rand_set();
	score=0;
	if(readCookie('hscore')!==null){highscore=readCookie('hscore');}
	$(h2)[0].innerHTML="Score : 0/"+highscore;
}
function game_restart(){
	if(confirm('Are you sure to retry?')){
		game_start();
	}
}
function splitEqual(a,str){
	str=str.split("|");
	for(i=0;i<str.length;i++){
		if(a==str[i])return 1;
	}
	return 0;
}
function keyPr(e){
	//Check the key ascii
	if(check_over()){game_over();return 0;}
	if (!e) {var e=window.event;}
	var syb='';
	if(splitEqual(e.keyCode,"38|87|56|104")){syb='up';}
	if(splitEqual(e.keyCode,"37|65|52|100")){syb='left';}
	if(splitEqual(e.keyCode,"40|83|50|98")){syb='down';}
	if(splitEqual(e.keyCode,"39|68|54|102")){syb='right';}
	add(syb);
}

function add(syb){
	//Check if the animation has animated
	if(tid!=tidd){return 0;}
	canmove=false;
	ref();lock=true;
	tid=0;tidd=0;
	//Well I'm a lazy boy so I didn't change this to 2D array...:-D
	//Up Progress
	if(syb=='up'){
		for(o=1;o<=5;o++){
			if(o==4){
				for(i=5;i<=16;i++){
					if(nums[i]=='-'){continue;}
					if(nums[i-4]==nums[i]){nums[i-4]*=2;score+=nums[i-4]-0;nums[i]='-';canmove=true;
						alldiv[Math.ceil(i/4)][y(i)].style.zIndex=++zdx;
						moveE(alldiv[Math.ceil(i/4)][y(i)],'up',null,Math.ceil((i-4)/4),true,y(i));
						tid++;
						alldiv[Math.ceil((i-4)/4)][y(i)]=alldiv[Math.ceil(i/4)][y(i)];
						alldiv[Math.ceil(i/4)][y(i)]=null;
					}
				}
			}
			else{
				for(i=5;i<=16;i++){
					if(nums[i]=='-'){continue;}
					if(nums[i-4]=='-'){nums[i-4]=nums[i];nums[i]='-';canmove=true;
						moveE(alldiv[Math.ceil(i/4)][y(i)],'up',null,Math.ceil((i-4)/4));
						tid++;
						alldiv[Math.ceil((i-4)/4)][y(i)]=alldiv[Math.ceil(i/4)][y(i)];
						alldiv[Math.ceil(i/4)][y(i)]=null;
					}
				}
			}
		}
	}
	//Down progress
	if(syb=='down'){
		for(o=1;o<=5;o++){
			if(o==4){
				for(i=12;i>=1;i--){
					if(nums[i]=='-'){continue;}
					if(nums[i+4]==nums[i]){nums[i+4]*=2;score+=nums[i+4]-0;nums[i]='-';canmove=true;
						alldiv[Math.ceil(i/4)][y(i)].style.zIndex=++zdx;
						moveE(alldiv[Math.ceil(i/4)][y(i)],'down',null,Math.ceil((i+4)/4),true,y(i));
						tid++;
						alldiv[Math.ceil((i+4)/4)][y(i)]=alldiv[Math.ceil(i/4)][y(i)];
						alldiv[Math.ceil(i/4)][y(i)]=null;
					}
				}
			}
			else{
				for(i=12;i>=1;i--){
					if(nums[i]=='-'){continue;}
					if(nums[i+4]=='-'){nums[i+4]=nums[i];nums[i]='-';canmove=true;
						moveE(alldiv[Math.ceil(i/4)][y(i)],'down',null,Math.ceil((i+4)/4));
						tid++;
						alldiv[Math.ceil((i+4)/4)][y(i)]=alldiv[Math.ceil(i/4)][y(i)];
						alldiv[Math.ceil(i/4)][y(i)]=null;
					}
				}
			}
		}
	}
	//Left progress
	if(syb=='left'){
		for(o=1;o<=5;o++){
			if(o==4){
				for(i=2;i<=16;i++){
					if(i==5||i==9||i==13){continue;}
					if(nums[i]=='-'){continue;}
					if(nums[i-1]==nums[i]){nums[i-1]*=2;score+=nums[i-1]-0;nums[i]='-';canmove=true;
						alldiv[Math.ceil(i/4)][y(i)].style.zIndex=++zdx;
						moveE(alldiv[Math.ceil(i/4)][y(i)],'left',y(i-1),null,true,Math.ceil(i/4));
						tid++;
						alldiv[Math.ceil(i/4)][y(i-1)]=alldiv[Math.ceil(i/4)][y(i)];
						alldiv[Math.ceil(i/4)][y(i)]=null;
					}
				}
			}
			else{
				for(i=2;i<=16;i++){
					if(i==5||i==9||i==13){continue;}
					if(nums[i]=='-'){continue;}
					if(nums[i-1]=='-'){nums[i-1]=nums[i];nums[i]='-';canmove=true;
						moveE(alldiv[Math.ceil(i/4)][y(i)],'left',y(i-1));
						tid++;
						alldiv[Math.ceil(i/4)][y(i-1)]=alldiv[Math.ceil(i/4)][y(i)];
						alldiv[Math.ceil(i/4)][y(i)]=null;
					}
				}
			}
		}
	}
	//Right progress
	if(syb=='right'){
		for(o=1;o<=5;o++){
			if(o==4){
				for(i=15;i>=1;i--){
					if(i==4||i==8||i==12){continue;}//Important! Skip them in order to keep the rules!
					if(nums[i]=='-'){continue;}
					if(nums[i+1]==nums[i]){nums[i+1]*=2;score+=nums[i+1]-0;nums[i]='-';canmove=true;
						alldiv[Math.ceil(i/4)][y(i)].style.zIndex=++zdx;
						moveE(alldiv[Math.ceil(i/4)][y(i)],'right',y(i+1),null,true,Math.ceil(i/4));
						tid++;
						alldiv[Math.ceil(i/4)][y(i+1)]=alldiv[Math.ceil(i/4)][y(i)];
						alldiv[Math.ceil(i/4)][y(i)]=null;}
				}
			}
			else{
				for(i=15;i>=1;i--){
					if(i==4||i==8||i==12){continue;}
					if(nums[i]=='-'){continue;}
					if(nums[i+1]=='-'){nums[i+1]=nums[i];nums[i]='-';canmove=true;
						moveE(alldiv[Math.ceil(i/4)][y(i)],'right',y(i+1));
						tid++;
						alldiv[Math.ceil(i/4)][y(i+1)]=alldiv[Math.ceil(i/4)][y(i)];
						alldiv[Math.ceil(i/4)][y(i)]=null;
					}
				}
			}
		}
	}
}
function ade(){
	if(tid!=tidd){return 0;}
	lock=false;if(canmove){
	if(document.getElementsByClassName){
		tmpa=document.getElementsByClassName('game');
	}else{
		var tmpa=new Array();
		for(yi=1;yi<=16;yi++){
				eval('tmpa[' + yi + ']=document.getElementById("b'+Math.ceil(yi/4)+y(g)+'");');
		}
	}var tmpal=tmpa.length-1;
	for(sb=tmpal;sb>=1;sb--){
		tmpa[sb].parentNode.removeChild(tmpa[sb]);}for(si=1;si<=4;si++){for(so=1;so<=4;so++){alldiv[si][so]=null;}}
	for(g=1;g<=16;g++){
		if(nums[g]=='-'){
			continue;
		}
		//ceil->line,y(i)->cow
		setNum(nums[g],Math.ceil(g/4),y(g));continue;
	}
	rand_set();
	}
	if(score>highscore){highscore=score;writeCookie('hscore',score,30)}
	$(h2)[0].innerHTML="Score : "+score+"/"+highscore;
	if(check_over()){game_over();return 0;}
	if(check_win()){alert('You win~');}
	writeCookie("nums",nums.toString(),30);
	writeCookie("score",score,30);
	
}
function check_win(){
	as=null;
	for(i=1;i<=4;i++){for(o=1;o<=4;o++){as+=alldiv[i][o];}}
	if(as.indexOf('2048')!=-1){return true;}
	return false;
}
function color_set(){
	for(i=1;i<=4;i++){
		for(o=1;o<=4;o++){
			if(!alldiv[i][o]){continue;}
			var c='',f='';
			switch(alldiv[i][o].childNodes[0].innerHTML){
				case '2':
					c='rgb(134,222,132)';f='#000000';break;
				case '4':
					c='rgb(103,204,252)';f='#000000';break;
				case '8':
					c='rgb(153,51,255)';f='#ffffff';break;
				case '16':
					c='rgb(255,154,154)';f='#000000';break;
				case '32':
					c='rgb(255,227,153)';f='#000000';break;
				case '64':
					c='rgb(163,205,73)';f='#000000';break;
				case '128':
					c='rgb(13,169,175)';f='#ffffff';break;
				case '256':
					c='rgb(108,56,153)';f='#ffffff';break;
				case '512':
					c='rgb(238,197,221)';f='#000000';break;
				case '1024':
					c='rgb(148,24,24)';f='#ffffff';break;
				case '2048':
					c='rgb(0,0,0)';f='#ffffffff';break;
				/*case "-":
					c='rgb(204,192,179)';f='rgb(204,192,179)';break;*/
			}
			alldiv[i][o].style.color=f;
			alldiv[i][o].style.backgroundColor=c;
		}
	}
}

function rand_set(){
	if(check_over()){game_over();return 0;}
	ref();//Refresh the array.
	var arr=new Array(),arrp=0;
	for(i=1;i<=4;i++){//i -> lines
		for(o=1;o<=4;o++){//o -> cows
				if(!alldiv[i][o]){
				arr[arrp]=(i-1)*4+o;
				arrp++;
				}
		}
	}
	var pSetA=arr[Math.round(Math.random()*(arr.length-1))];
	var pSetX=y(pSetA);//cow
	var pSetY=Math.ceil(pSetA / 4);//line
	if(alldiv[pSetY][pSetX]){alert('Wrong random number: '+pSetY+pSetX);rand_set();return 1;}
	var tSet=Math.round(Math.random());
	if(tSet==0){tSet=2;}if(tSet==1){tSet=4;}
	setNum(tSet,pSetY,pSetX);
	ref();color_set();
	alldiv[pSetY][pSetX].style.opacity=0;
	$(alldiv[pSetY][pSetX]).animate({opacity:'1'});
}
function check_over(){
	var allsym='';
	for(i=1;i<=4;i++){
		for(o=1;o<=4;o++){
			if(!alldiv[i][o]){return false;}
			allsym+=alldiv[i][o].childNodes[0].innerHTML;
		}
	}
	if(allsym.indexOf('-')==-1){
		var isOver=true;
		for(i=2;i<=4;i++){for(o=1;o<=4;o++){
			if(!alldiv[i][o]){continue;}
			if(alldiv[i][o].childNodes[0].innerHTML==alldiv[i-1][o].childNodes[0].innerHTML){
				isOver=false;}}}
		for(i=1;i<=3;i++){for(o=1;o<=4;o++){if(!alldiv[i][o]){continue;}
			if(alldiv[i][o].childNodes[0].innerHTML==alldiv[i+1][o].childNodes[0].innerHTML){
				isOver=false;}}}
		for(i=1;i<=4;i++){for(o=1;o<=3;o++){if(!alldiv[i][o]){continue;}
			if(alldiv[i][o].childNodes[0].innerHTML==alldiv[i][o+1].childNodes[0].innerHTML){
				isOver=false;}}}
		for(i=1;i<=4;i++){for(o=4;o>=2;o--){if(!alldiv[i][o]){continue;}
			if(alldiv[i][o].childNodes[0].innerHTML==alldiv[i][o-1].childNodes[0].innerHTML){
				isOver=false;}}}
		if(isOver){return true;}
		
	}
	return false;
}

function clear_all(){
	for(i=1;i<=4;i++){for(o=1;o<=4;o++){
		if(!alldiv[i][o]){continue;}
		alldiv[i][o].parentNode.removeChild(alldiv[i][o]);
		alldiv[i][o]=null;
	}}
	for(i=1;i<=16;i++){nums[i]='-';}
}
	
	
	
function game_over(){
	alert('Game over!');
	removeCookie("nums");
	writeCookie("score",0,30);
}


// For touching devices

function up(e){
	if(!e){var e=window.event;}
	if((moveDisY-e.changedTouches[0].clientY)>=sch/10){add('up');}
	else if((moveDisY-e.changedTouches[0].clientY)<=-sch/10){add('down');}
	else if((moveDisX-e.changedTouches[0].clientX)>=scw/10){add('left');}
	else if((moveDisX-e.changedTouches[0].clientX)<=-scw/10){add('right');}
	return false;
}
function down(e){
	if(!e){var e=window.event;}
	moveDisX=e.targetTouches[0].clientX;moveDisY=e.targetTouches[0].clientY;
	return false;
}

//what.iid!
//only toGX or toGY
function moveE(what,toWhere,toGX,toGY,isMulti,ext){
	switch(toGX||toGY){
		case 1:
			toPX=2;break;
		case 2:
			toPX=26.5;break;
		case 3:
			toPX=51;break;
		case 4:
			toPX=75.5;break;
	}
	tLeft=toPX+'%';
	tTop=toPX+'%';
	if(toWhere=='left'||toWhere=='right'){
		if(!isMulti){
			$(what).animate({left:tLeft},38,null,function(){tidd++;ade();});
		}else{
			$(what).animate({left:tLeft},38,null,function(){
				tidd++;
				if(!alldiv[ext][toGX]){
					if(toWhere=='right'){alldiv[ext][toGX+1].childNodes[0].innerHTML*=2;}
					else{alldiv[ext][toGX-1].childNodes[0].innerHTML*=2;}
				}else {
					alldiv[ext][toGX].childNodes[0].innerHTML*=2;
				}
				ade();
				});
		}
	}else if(toWhere=='up'||toWhere=='down'){
		if(!isMulti){
			$(what).animate({top:tTop},38,null,function(){tidd++;ade();});
		}else{
			$(what).animate({top:tTop},38,null,function(){
				tidd++;
				if(!alldiv[toGY][ext]){
					if(toWhere=='down'){alldiv[toGY+1][ext].childNodes[0].innerHTML*=2;}
					else{alldiv[toGY-1][ext].childNodes[0].innerHTML*=2;}
				}else {
					alldiv[toGY][ext].childNodes[0].innerHTML*=2;
				}
				ade();
				});
		}
	}
}

function setNum(num,GY,GX){
	var PL,PT;
	switch(GX){
		case 1:
			PL=2;break;
		case 2:
			PL=26.5;break;
		case 3:
			PL=51;break;
		case 4:
			PL=75.5;break;
	}
	switch(GY){
		case 1:
			PT=2;break;
		case 2:
			PT=26.5;break;
		case 3:
			PT=51;break;
		case 4:
			PT=75.5;break;
	}
	var w=document.createElement("div");
	w.style.position="absolute";
	w.style.zIndex=zdx++;
	w.style.fontSize='32px';
	w.style.left=PL+'%';
	w.style.top=PT+'%';
	w.style.width='22.5%';
	w.style.height='22.5%';
	w.style.borderRadius='3px';
	w.innerHTML="<center style='font-size:"+sch*0.073125+"px;padding-top:"+sch*0.0351+"px'>"+num+"</center>";
	w.id="b"+GY+GX;
	$(all).append(w);
	document.getElementById('b'+GY+GX).setAttribute('class','game');
	color_set();
	alldiv[GY][GX]=w;//GX->lines;GY->cows
	w=null;
}
