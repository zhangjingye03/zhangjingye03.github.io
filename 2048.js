var alldiv = new Array();var nums=new Array();var canmove=false;
for(i=1;i<=4;i++){alldiv[i]=new Array();}
function loaded(){
	sch=document.body.clientHeight;
	scw=document.body.clientWidth;
	h1=document.getElementById('h1');div_all=document.getElementById('all');
	h1.style.fontSize="48px"
	h1.style.left="25%";h1.style.right="25%";h1.style.top="0px";h1.style.height="18%";
	div_all.style.top="25%";div_all.style.bottom="20%";div_all.style.left="1%";
	div_all.style.backgroundColor="rgb(187,173,160)";div_all.style.width="98%";
	/*if(sch>=scw)*/{var eachWid=(scw)/4-50;}
	//else{var eachWid=(sch)/4-30;}
	/*if(document.getElementsByClassName){
		alldiv=document.getElementsByClassName('game');
	}else{
		for(i=1;i<=16;i++)	eval('alldiv[' + i + ']=document.getElementById("b'+i+'");');
	}*/
	//DONE : COPY ALL CONTROLS TO FAKE BACKGROUND\
	var alldiv_f=new Array();
	for(i=1;i<=16;i++){
		alldiv_f[i]=document.createElement('label');
		alldiv_f[i].style.backgroundColor="rgb(204, 192, 179)";
		alldiv_f[i].innerHTML="";
		alldiv_f[i].style.zIndex=0;
		alldiv_f[i].id="f"+i;
		alldiv_f[i].style.position="absolute";
		document.getElementById('all').appendChild(alldiv_f[i]);
	}
	
	/*for(i=1;i<=16;i++){
		//DONE :: set each number's color!
		alldiv[i].style.position='absolute';
		alldiv[i].style.fontSize='32px';
		alldiv[i].style.backgroundColor="rgb(238,228,218)";
		alldiv[i].style.zIndex=2;
	}
	for(i=1;i<=4;i++){
		//Width!
		alldiv[4*i-3].style.left="2%";alldiv[4*i-3].style.right="77%";
		alldiv[4*i-2].style.left="27%";alldiv[4*i-2].style.right="52%";
		alldiv[4*i-1].style.left="52%";alldiv[4*i-1].style.right="27%";
		alldiv[4*i].style.left="77%";alldiv[4*i].style.right="2%";
		//Height!
		alldiv[i].style.top="2%";alldiv[i].style.bottom="77%";
		alldiv[i+4].style.top="27%";alldiv[i+4].style.bottom="52%";
		alldiv[i+8].style.top="52%";alldiv[i+8].style.bottom="27%";
		alldiv[i+12].style.top="77%";alldiv[i+12].style.bottom="2%";
	}*/
	for(i=1;i<=4;i++){//FAKE one
		//Width!
		alldiv_f[4*i-3].style.left="2%";alldiv_f[4*i-3].style.right="77%";
		alldiv_f[4*i-2].style.left="27%";alldiv_f[4*i-2].style.right="52%";
		alldiv_f[4*i-1].style.left="52%";alldiv_f[4*i-1].style.right="27%";
		alldiv_f[4*i].style.left="77%";alldiv_f[4*i].style.right="2%";
		//Height!
		alldiv_f[i].style.top="2%";alldiv_f[i].style.bottom="77%";
		alldiv_f[i+4].style.top="27%";alldiv_f[i+4].style.bottom="52%";
		alldiv_f[i+8].style.top="52%";alldiv_f[i+8].style.bottom="27%";
		alldiv_f[i+12].style.top="77%";alldiv_f[i+12].style.bottom="2%";
	}
	ref();
	game_start();
	h1=document.getElementById('h1');
}
var sch;var scw;var h1;var div_all;
window.onload=loaded;
document.onkeyup=keyPr;
document.ontouchstart=down;
document.ontouchend=up;
function y(n){
	if(n%4==0){return 4;}else{return n%4;}
}
function ref(){
	if(!lock){for(i=1;i<=16;i++){
		if(!alldiv[Math.ceil(i/4)][y(i)]){nums[i]='-';continue;}
		nums[i]=alldiv[Math.ceil(i/4)][y(i)].innerHTML;
	}}
}
/*function pusH(num){
	for(i=1;i<=16;i++){
		if(nums[i]=='-'){alldiv[y(i)][Math.ceil(i/4)];continue;}
		alldiv[y(i)][Math.ceil(i/4)].innerHTML=num[i];
	}
}
function pulL(){
	var tmp=new Array();
	for(i=1;i<=16;i++){
		if(!alldiv[y(i)][Math.ceil(i/4)]){tmp[i]='-';continue;}
		tmp[i]=alldiv[i].innerHTML;
	}
	return tmp;
}*/
var first=true;
function game_start(){
	if(!first){
		if(!confirm('Are you sure to retry?')){return 0;}};
	clear_all();
	rand_set();
}
function game_restart(){
	if(confirm('Are you sure to retry?')){
	clear_all();
	rand_set();}
	score=0;
	document.getElementById('h2').innerHTML="Score : "+score;
}
function keyPr(e){
	if(check_over()){game_over();return 0;}
	if (!e) {var e=window.event;}
	var syb='';
	if(e.keyCode==38){syb='up';}
	if(e.keyCode==37){syb='left';}
	if(e.keyCode==40){syb='down';}
	if(e.keyCode==39){syb='right';}
	add(syb);
}

var score=0;var lock=false;
var tid=0;tidd=0;
function add(syb){
	if(tid!=tidd){return 0;}
	canmove=false;
	first=false;
	/*nums=null;
	//Define an array in order to make it easy to fix (I'm lazy~)
	for(i=1;i<=4;i++){for(o=1;o<=4;o++){
		if(!alldiv[i][o]){nums+=',-';continue;}
		nums+=(','+alldiv[i][o].innerHTML);
	}}*/
	ref();lock=true;
	for(i=1;i<=4;i++){for(o=1;o<=4;o++){
		if(!alldiv[i][o]){continue;}
		alldiv[i][o].animated=false;
	}}
	tid=0;tidd=0;
	//Make the first element empty so we can use 1 to 16 easily.
	//nums=nums.split(',');
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
		tmpa[sb].remove();}for(si=1;si<=4;si++){for(so=1;so<=4;so++){alldiv[si][so]=null;}}
	for(g=1;g<=16;g++){
		if(nums[g]=='-'){
			/*if(!alldiv[Math.ceil(g/4)][y(g)]){continue;}
			alldiv[Math.ceil(g/4)][y(g)].remove();
			$('b'+Math.ceil(g/4)+y(g)).remove();
			alldiv[Math.ceil(g/4)][y(g)]=null;*/
			continue;
			}
		//ceil->line,y(i)->cow
		setNum(nums[g],Math.ceil(g/4),y(g));continue;
	}
	rand_set();
	}
	if(check_over()){game_over();return 0;}
	$("h2").innerHTML="Score : "+score;
}

function color_set(){
	for(i=1;i<=4;i++){
		for(o=1;o<=4;o++){
			if(!alldiv[i][o]){continue;}
			var c='';var f='';
			switch(alldiv[i][o].innerHTML){
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
	var arr=null;
	var arr=new Array();arrp=0;
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
//	alldiv[pSetX][pSetY].innerHTML=tSet;
	setNum(tSet,pSetY,pSetX);
	ref();color_set();
	alldiv[pSetY][pSetX].style.opacity=0;//var what=eval('l'+pSet);
	//alert('l'+pSet+'.iid=setInterval("opa(l'+pSet+');",1)');
	//alldiv[arr[pSet]].iid=setInterval("opa(alldiv["+arr[pSet]+"]);",5);
	$(alldiv[pSetY][pSetX]).animate({opacity:'1'},"slow");
}

/*function opa(what){
	if(what.style.opacity>=1){
		window.clearInterval(what.iid);return 1;}
		what.style.opacity=what.style.opacity-0+0.04;return 0;
}*/

function check_over(){
	var allsym='';
	for(i=1;i<=4;i++){
		for(o=1;o<=4;o++){
			if(!alldiv[i][o]){return false;}
			allsym+=alldiv[i][o].innerHTML;
		}
	}
	if(allsym.indexOf('-')==-1){
		var isOver=true;
		for(i=2;i<=4;i++){for(o=1;o<=4;o++){
			if(!alldiv[i][o]){continue;}
			if(alldiv[i][o].innerHTML==alldiv[i-1][o].innerHTML){
				isOver=false;}}}
		for(i=1;i<=3;i++){for(o=1;o<=4;o++){if(!alldiv[i][o]){continue;}
			if(alldiv[i][o].innerHTML==alldiv[i+1][o].innerHTML){
				isOver=false;}}}
		for(i=1;i<=4;i++){for(o=1;o<=3;o++){if(!alldiv[i][o]){continue;}
			if(alldiv[i][o].innerHTML==alldiv[i][o+1].innerHTML){
				isOver=false;}}}
		for(i=1;i<=4;i++){for(o=4;o>=2;o--){if(!alldiv[i][o]){continue;}
			if(alldiv[i][o].innerHTML==alldiv[i][o-1].innerHTML){
				isOver=false;}}}
		if(isOver){return true;}
		
	}
	return false;
}

function clear_all(){
	for(i=1;i<=4;i++){for(o=1;o<=4;o++){
		if(!alldiv[i][o]){continue;}
		$(alldiv[i][o]).remove();
		alldiv[i][o]=null;
	}}}
	
	
	
function game_over(){
	alert('Game over!');
	//game_start();
}


// For touching devices
var moveDisX=0;var moveDisY=0;
function up(e){
	if(!e){var e=window.event;}//alert('up');h1.innerHTML=e.targetTouches[0].clientX;
	if((moveDisY-e.changedTouches[0].clientY)>=sch/4){add('up');}
	else if((moveDisY-e.changedTouches[0].clientY)<=-sch/4){add('down');}
	else if((moveDisX-e.changedTouches[0].clientX)>=scw/4){add('left');}
	else if((moveDisX-e.changedTouches[0].clientX)<=-scw/4){add('right');}
	//console.log('up:\nX:'+e.screenX+'\nY:'+e.screenY);
	return false;
}
function down(e){
	if(!e){var e=window.event;}
	moveDisX=e.targetTouches[0].clientX;moveDisY=e.targetTouches[0].clientY;
	//h1.innerHTML=e.targetTouches[0].clientX;
	//console.log('down:\nX:'+e.screenX+'\nY:'+e.screenY);
	return false;
}

//what.iid!
//only toGX or toGY
function moveE(what,toWhere,toGX,toGY,isMulti,ext){
	var tLeft=parseFloat(what.style.left);
	var tRight=parseFloat(what.style.right);
	var tTop=parseFloat(what.style.top);
	var tBottom=parseFloat(what.style.bottom);
	var toPX=null;var toPXR=null;
	switch(toGX||toGY){
		case 1:
			toPX=2;toPXR=77;break;
		case 2:
			toPX=27;toPXR=52;break;
		case 3:
			toPX=52;toPXR=27;break;
		case 4:
			toPX=77;toPXR=2;break;
	}
	tLeft=toPX+'%';
	tRight=toPXR+'%';
	tTop=toPX+'%';
	tBottom=toPXR+'%';
	if(toWhere=='left'||toWhere=='right'){
		if(!isMulti){
			$(what).animate({left:tLeft,right:tRight},"fast",null,function(){tidd++;ade();});
		}else{
			$(what).animate({left:tLeft,right:tRight},"fast",null,function(){
				tidd++;
				alldiv[ext][toGX].innerHTML*=2;
				ade();
				});
		}
	}else if(toWhere=='up'||toWhere=='down'){
		if(!isMulti){
			$(what).animate({top:tTop,bottom:tBottom},"fast",null,function(){tidd++;ade();});
		}else{
			$(what).animate({top:tTop,bottom:tBottom},"fast",null,function(){
				tidd++;
				alldiv[toGY][ext].innerHTML*=2;
				ade();
				});
		}
	}
}
var zdx=5;
function setNum(num,GY,GX){
	var PL,PR,PT,PB;
	switch(GX){
		case 1:
			PL=2;PR=77;break;
		case 2:
			PL=27;PR=52;break;
		case 3:
			PL=52;PR=27;break;
		case 4:
			PL=77;PR=2;break;
	}
	switch(GY){
		case 1:
			PT=2;PB=77;break;
		case 2:
			PT=27;PB=52;break;
		case 3:
			PT=52;PB=27;break;
		case 4:
			PT=77;PB=2;break;
	}
	var w=document.createElement("label");
	w.style.position="absolute";
	w.style.zIndex=zdx++;
	w.style.fontSize='32px';
	w.style.left=PL+'%';
	w.style.right=PR+'%';
	w.style.top=PT+'%';
	w.style.bottom=PB+'%';
	w.innerHTML=num;
	w.id="b"+GY+GX;//w.class="game";
	$(all).append(w);
	document.getElementById('b'+GY+GX).setAttribute('class','game');
	color_set();
	alldiv[GY][GX]=w;//GX->lines;GY->cows
	w=null;
	//if(!lock){ref();}
}