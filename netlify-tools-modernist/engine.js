(function(){"use strict";
const ISR={25:[.93,1.54],35:[.671,1.11],50:[.495,.82],70:[.343,.567],95:[.247,.41],120:[.196,.324],150:[.159,.264],185:[.127,.21],240:[.0965,.16],300:[.0769,.13],400:[.0602,.1],500:[.0468,.0774],630:[.0362,.06],800:[.0283,.047],1000:[.0225,.0372]};
const CATR={4:[5.88,9.5],6:[3.93,5.91],10:[2.33,3.95],16:[1.47,2.44]};
const GRADES=['1.9/3.3','3.3/3.3','3.8/6.6','6.6/6.6','6.35/11','11/11','12.7/22','19/33'];
const XA2={50:[.115,.115,.119,.133,.133,.133,.137,.147],70:[.109,.109,.113,.123,.123,.126,.13,.141],95:[.104,.104,.108,.116,.116,.12,.124,.135],120:[.1,.1,.104,.112,.112,.117,.119,.13],150:[.096,.096,.101,.109,.109,.112,.115,.126],185:[.094,.094,.099,.107,.107,.11,.114,.124],240:[.091,.091,.096,.104,.104,.106,.11,.118],300:[.088,.088,.093,.1,.1,.102,.105,.112],400:[.086,.086,.091,.096,.096,.098,.101,.108],500:[.085,.085,.088,.093,.093,.095,.098,.105],630:[.083,.083,.087,.092,.092,.094,.095,.101],800:[.081,.081,.085,.089,.089,.091,.092,.097],1000:[.082,.082,.084,.087,.087,.088,.09,.096]};
const XA3={25:[.098,.098,.109,.116,.116,.152,null,null],35:[.094,.094,.104,.111,.111,.144,.147,null],50:[.087,.087,.098,.104,.104,.137,.14,.133],70:[.084,.084,.094,.1,.1,.129,.132,.125],95:[.081,.081,.09,.095,.095,.123,.125,.121],120:[.078,.078,.087,.092,.092,.117,.12,.116],150:[.076,.076,.085,.089,.089,.114,.116,.112],185:[.075,.075,.083,.087,.087,.11,.113,.11],240:[.073,.073,.081,.085,.085,.106,.108,.105],300:[.072,.072,.079,.082,.082,.103,.105,.1],400:[.071,.071,.078,.079,.079,.099,.101,.097]};
const XFIX={'A2|500|12.7/22':'IS table shows 0.988 Ω/km (decimal slip). Corrected to 0.098.','A2|400|19/33':'IS table shows 0.119 Ω/km, out of sequence between 0.112 (300) and 0.105 (500). Corrected to 0.108.'};
const XLV_MC={4:.0933,6:.0888,10:.0842,16:.0802,25:.0808,35:.0787,50:.078,70:.0742,95:.0725,120:.0713,150:.0718,185:.072,240:.0713,300:.0703,400:.0702,500:.07,630:.0697};
const XLV_1C={10:.131,16:.124,25:.117,35:.112,50:.108,70:.1,95:.099,120:.0951,150:.0936,185:.0913,240:.0887,300:.0868,400:.0861,500:.0843,630:.0829,800:.0819,1000:.082};
const TF={
  LV:{air:[[25,1.14],[30,1.10],[35,1.05],[40,1],[45,.95],[50,.89],[55,.84],[60,.77]],gnd:[[15,1.12],[20,1.08],[25,1.04],[30,1],[35,.96],[40,.91],[45,.87],[50,.82]]},
  HV:{air:[[20,1.08],[25,1.04],[30,1],[35,.96],[40,.91],[45,.87],[50,.82],[55,.76],[60,.71]],gnd:[[10,1.07],[15,1.04],[20,1],[25,.96],[30,.93],[35,.89],[40,.85],[45,.8],[50,.76]]}
};
function interp(tab,x){x=+x;if(x<=tab[0][0])return tab[0][1];for(let i=1;i<tab.length;i++){if(x<=tab[i][0]){const[a,fa]=tab[i-1],[b,fb]=tab[i];return fa+(fb-fa)*(x-a)/(b-a)}}return tab[tab.length-1][1]}

/* ---------- catalogue ratings [mm², ground, duct, air] ---------- */
const LVCU2=[[4,54,45,48],[6,67,56,61],[10,89,75,83],[16,115,96,108],[25,147,122,140],[35,176,146,172],[50,208,173,208],[70,253,211,262],[95,302,252,322],[120,340,284,368],[150,379,317,419],[185,425,357,482],[240,486,409,566],[300,541,456,644],[400,602,508,734]];
const LVCU3=[[4,45,38,41],[6,56,47,52],[10,74,62,70],[16,95,79,89],[25,122,102,119],[35,146,122,147],[50,173,144,179],[70,212,177,226],[95,254,212,279],[120,287,240,320],[150,321,269,365],[185,362,304,422],[240,418,352,500],[300,469,396,574],[400,528,447,662]];
const LVAL2=[[4,42,36,38],[6,55,46,50],[10,68,57,64],[16,89,74,83],[25,114,95,109],[35,136,113,133],[50,161,134,162],[70,197,164,204],[95,235,196,251],[120,266,222,287],[150,296,248,328],[185,335,281,379],[240,385,324,448],[300,432,364,513],[400,487,412,593],[500,548,463,683],[630,612,518,784]];
const LVAL3=[[4,35,30,32],[6,46,38,42],[10,57,48,54],[16,74,61,69],[25,95,79,93],[35,114,94,114],[50,134,112,138],[70,164,137,175],[95,197,164,216],[120,223,187,249],[150,249,209,284],[185,282,238,329],[240,327,276,392],[300,369,312,452],[400,420,356,526],[500,478,412,612]];
const LVCU1=[[10,90,77,76,70,83,71],[16,115,98,97,89,108,94],[25,148,126,124,114,144,126],[35,177,150,148,136,176,154],[50,208,177,174,160,212,187],[70,255,216,213,195,269,238],[95,312,260,256,233,340,303],[120,355,295,291,264,396,354],[150,396,329,324,294,450,403],[185,447,371,365,330,519,468],[240,515,427,420,379,613,553],[300,576,477,469,422,700,634],[400,651,537,528,473,813,737],[500,727,598,589,525,930,844],[630,806,661,651,578,1056,961],[800,877,721,707,626,1179,1077],[1000,935,772,751,668,1288,1188]];
const LVAL1=[[10,69,59,58,54,64,55],[16,89,76,75,69,84,72],[25,115,98,96,89,112,98],[35,137,116,115,106,137,119],[50,161,137,135,124,165,145],[70,198,168,165,151,209,185],[95,243,202,199,181,264,235],[120,276,230,226,206,308,276],[150,308,256,252,229,350,314],[185,349,290,285,258,406,366],[240,404,335,329,298,480,434],[300,454,376,369,333,551,500],[400,518,429,421,378,647,589],[500,588,485,476,426,751,685],[630,663,546,536,477,868,793],[800,740,608,596,528,992,907],[1000,812,665,652,575,1117,1022]];
const HVCU3=[[35,154,134,172],[50,181,158,205],[70,220,194,253],[95,263,232,307],[120,298,264,352],[150,332,296,397],[185,374,335,453],[240,431,387,529],[300,482,435,599],[400,541,492,683],[500,610,537,804,[608,548,820]]];
const HVAL3=[[35,119,103,132],[50,140,122,158],[70,171,150,196],[95,203,179,236],[120,232,205,273],[150,260,231,309],[185,294,262,355],[240,340,305,415],[300,384,346,475],[400,438,398,552],[500,494,435,649,[494,441,658]]];
const HVCU1=[[70,239,227,296],[95,285,271,361],[120,323,308,417],[150,361,343,473],[185,406,387,543],[240,469,447,641],[300,526,504,735],[400,590,564,845],[500,604,525,911,[581,499,908]],[630,660,571,1023,[633,541,1012]],[800,690,594,1103,[679,594,1115]],[1000,726,621,1191,[694,605,1181]]];
const HVAL1=[[70,186,176,230],[95,221,210,280],[120,252,240,324],[150,281,267,368],[185,317,303,424],[240,367,351,502],[300,414,397,577],[400,470,451,673],[500,498,433,748,[483,415,746]],[630,555,481,856,[536,458,847]],[800,597,514,949,[586,513,953]],[1000,643,550,1049,[618,538,1038]]];
const XCAT_HV={35:.09,50:.096,500:.077};

function rFor(mm,mat){const i=mat==='Cu'?0:1;if(ISR[mm])return[ISR[mm][i],'IS'];if(CATR[mm])return[CATR[mm][i],'CAT'];return[null,'']}
function buildLib(){
  const L={};
  const lv=(key,name,mat,k,sets)=>{const rows=[];
    sets.forEach(([c,data,from])=>data.filter(r=>!from||r[0]>=from).forEach(r=>{const[R,rs]=rFor(r[0],mat);
      if(c==='1C')rows.push({c,mm:r[0],gnd:r[2],duct:r[4],air:r[6],gnd2:r[1],duct2:r[3],air2:r[5],R,rs,X:XLV_1C[r[0]]});
      else rows.push({c,mm:r[0],gnd:r[1],duct:r[2],air:r[3],R,rs,X:XLV_MC[r[0]]})}));
    L[key]={name,mat,hv:false,k,rows}};
  const hv=(key,name,mat,k,sets)=>{const rows=[];
    sets.forEach(([c,data])=>data.forEach(r=>{const[R,rs]=rFor(r[0],mat);const o={c,mm:r[0],gnd:r[1],duct:r[2],air:r[3],R,rs,Xcat:XCAT_HV[r[0]]||null};if(r[4])o.alt={gnd:r[4][0],duct:r[4][1],air:r[4][2]};rows.push(o)}));
    L[key]={name,mat,hv:true,k,rows}};
  hv('HV-CU','MV/HV · Cu · XLPE armoured (IEC 60502-2 / BS 6622)','Cu',143,[['1C',HVCU1],['3C',HVCU3]]);
  hv('HV-AL','MV/HV · Al · XLPE armoured (IEC 60502-2 / BS 6622)','Al',94,[['1C',HVAL1],['3C',HVAL3]]);
  lv('LV-CU','LV · Cu · XLPE armoured · 0.65/1.1 kV (2XWY / 2XFY / 2XWaY)','Cu',143,[['1C',LVCU1],['2C',LVCU2],['3C',LVCU3],['3.5C',LVCU3,16],['4C',LVCU3]]);
  lv('LV-AL','LV · Al · XLPE armoured · 0.65/1.1 kV (A2XWY / A2XFY / A2XWaY)','Al',94,[['1C',LVAL1],['2C',LVAL2],['3C',LVAL3],['3.5C',LVAL3,16],['4C',LVAL3]]);
  return L;
}
const DEF_LIB=buildLib();
const COREORD=['1C','2C','3C','3.5C','4C'];
const DUTY=[['inc_tr','Incomer from transformer'],['inc_sw','Incomer from other switchboard'],['plant','Plant feeder'],['trf','Transformer feeder'],['motor','Motor feeder']];
const DUTYN=Object.fromEntries(DUTY);
const CATS=[['HVM','MV/HV Motors'],['LVM','LV Motors'],['HVF','MV/HV Feeders'],['LVF','LV Feeders']];
const CATN={HVM:'MV/HV Motor',LVM:'LV Motor',HVF:'MV/HV Feeder',LVF:'LV Feeder'};
const LAYN={A:'Air / tray',G:'Ground',D:'Duct'};


/* =====================================================================
   DEFAULTS
   ===================================================================== */
const DEF_SET={lenMargin:5,tAir:40,tGnd:30,tCorr:true,scShare:false,
  lim:{HV:{Motor:{run:3,start:5},Power:{run:0.5}},LV:{Motor:{run:5,start:15},Power:{run:2.5}}},
  grp:{HV:{A:0.79,G:0.5,D:0.5},LV:{A:0.54,G:0.38,D:0.38}},
  duty:{inc_tr:1,inc_sw:0.6,plant:0.6,trf:0.4,motor:0.2}};
const ISC_DEF={HV:40,LV:65};
let _n=Date.now()%1e6;
const uid=p=>(p||'f')+(++_n).toString(36)+Math.random().toString(36).slice(2,5);
const clone=o=>JSON.parse(JSON.stringify(o));
const SQ3=Math.sqrt(3);
const isNum=v=>v!==''&&v!==null&&v!==undefined&&isFinite(+v);
const pick=(v,d)=>isNum(v)?+v:d;
const vclass=f=>(+f.V)>500?'HV':'LV';
const typOf=f=>f.type==='Power'?'Power':'Motor';
const catOf=f=>vclass(f)+(f.type==='Power'?'F':'M');
function F(o){return Object.assign({id:uid(),swgr:'',tag:'',from:'',to:'',desc:'',chain:'',type:'Motor',duty:'motor',phase:'3P',load:0,unit:'kW',V:415,pf:0.85,eff:0.93,start:'DOL',klr:6,pfs:0.3,lrcTol:20,earth:'E',lib:'LV-AL',grade:'',cores:'3C',mm:95,runs:1,lay:'G',len:100,der:'',vdr:'',vds:'',isc:'',t:''},o)}
// feeder-wise values take the project values as defaults
function fillDefaults(f,S,force){
  const cl=vclass(f),typ=typOf(f),all=force==='all';
  if(all||force==='class'||force==='type'||!isNum(f.vdr))f.vdr=S.lim[cl][typ].run;
  if(typ==='Motor'&&(all||force==='class'||force==='type'||!isNum(f.vds)))f.vds=S.lim[cl].Motor.start;
  if(all||force==='class'||force==='lay'||!isNum(f.der))f.der=S.grp[cl][f.lay];
  if(all||force==='class'||!isNum(f.isc))f.isc=ISC_DEF[cl];
  if(!isNum(f.lrcTol))f.lrcTol=20;if(!f.earth)f.earth='E';if(f.swgr==null)f.swgr='';
  return f;
}
const NEWF={
  HVM:()=>F({type:'Motor',duty:'motor',load:500,V:6600,pf:.88,eff:.95,klr:6,pfs:.25,lib:'HV-AL',cores:'3C',mm:240,lay:'G',len:300}),
  LVM:()=>F({type:'Motor',duty:'motor',load:30,V:415,pf:.86,eff:.92,klr:7,pfs:.3,lib:'LV-AL',cores:'3C',mm:25,lay:'G',len:150}),
  HVF:()=>F({type:'Power',duty:'trf',load:2000,unit:'kVA',V:6600,pf:.85,lib:'HV-AL',cores:'3C',mm:240,lay:'G',len:200}),
  LVF:()=>F({type:'Power',duty:'plant',load:250,unit:'kVA',V:415,pf:.85,lib:'LV-AL',cores:'3.5C',mm:185,lay:'G',len:100})
};
function seedFeeders(S){return [
  F({swgr:'SWGR-3.3A',tag:'M-01',from:'3.3 kV SWGR-A',to:'Compressor motor M-01',desc:'750 kW DOL motor',type:'Motor',duty:'motor',load:750,V:3300,pf:.85,eff:.955,klr:5,pfs:.13,lib:'HV-CU',cores:'3C',mm:185,lay:'G',len:400,der:.5}),
  F({swgr:'SWGR-6.6A',tag:'P-102A',from:'6.6 kV SWGR-A',to:'Charge pump P-102A',desc:'2650 kW DOL motor, 2 runs',type:'Motor',duty:'motor',load:2650,V:6600,pf:.92,eff:.96,klr:5,pfs:.3,lib:'HV-AL',cores:'3C',mm:240,runs:2,lay:'G',len:215,der:.5,vdr:2.5,vds:4.5}),
  F({swgr:'PCC-A',tag:'P-201A',from:'PCC-A',to:'Stripper bottoms pump P-201A',desc:'110 kW DOL motor',type:'Motor',duty:'motor',load:110,V:415,pf:.87,eff:.952,klr:7.7,pfs:.35,lib:'LV-AL',cores:'3C',mm:240,runs:2,lay:'G',len:286}),
  F({swgr:'MCC-A',tag:'P-202',from:'MCC-A',to:'Lean amine pump P-202',desc:'75 kW DOL motor',type:'Motor',duty:'motor',load:75,V:415,pf:.85,eff:.9,klr:7.7,pfs:.28,lib:'LV-AL',cores:'3C',mm:50,runs:2,lay:'G',len:100,der:.4}),
  F({swgr:'SWGR-6.6A',tag:'TF-01',from:'6.6 kV SWGR-A',to:'Transformer TR-01 (3150 kVA)',desc:'Transformer primary feeder',type:'Power',duty:'trf',load:3150,unit:'kVA',V:6600,pf:.8,lib:'HV-CU',cores:'3C',mm:240,lay:'G',len:50,der:.7}),
  F({swgr:'SWGR-3.3A',tag:'TF-02S',from:'Transformer TR-02 (8 MVA)',to:'3.3 kV SWGR-A incomer',desc:'Transformer secondary, 4 × (3×1C)',type:'Power',duty:'inc_tr',load:8000,unit:'kVA',V:3300,pf:.8,lib:'HV-CU',cores:'1C',mm:500,runs:4,lay:'G',len:100,der:.75}),
  F({swgr:'PCC-A',tag:'TR-03 LV',from:'Transformer TR-03 (1600 kVA)',to:'PCC-A incomer',desc:'LV transformer secondary',type:'Power',duty:'inc_tr',load:1600,unit:'kVA',V:415,pf:.8,lib:'LV-AL',cores:'3.5C',mm:300,runs:6,lay:'A',len:61,der:.6,vdr:1}),
  F({swgr:'UPS ACDB',tag:'UPS-DB1',from:'UPS ACDB',to:'Control system DB-1',desc:'12.5 kVA, 110 V single phase',type:'Power',duty:'plant',phase:'1P',load:12.5,unit:'kVA',V:110,pf:.9,lib:'LV-CU',cores:'2C',mm:120,lay:'A',len:84,vdr:3.5})
].map(f=>fillDefaults(f,S))}
function snapOf(p){return JSON.stringify({n:p.name,s:p.set,f:p.feeders})}
function newProject(name,feeders){const p={id:uid('p'),name,set:clone(DEF_SET),feeders:[]};p.feeders=feeders?feeders(p.set):[];p.saved=snapOf(p);return p}
function simpleDefault(){const S=clone(DEF_SET);return{set:S,f:fillDefaults(F({tag:'Feeder-1',from:'',to:'',type:'Motor',duty:'motor',load:200,V:6600,pf:.86,eff:.94,klr:6,pfs:.25,lib:'HV-AL',cores:'3C',mm:240,lay:'G',len:300}),S)}}

/* =====================================================================
   ENGINE
   ===================================================================== */
function autoGrade(V,earth){const kv=(+V)/1000,e=earth!=='UE';if(kv<=3.3)return e?'1.9/3.3':'3.3/3.3';if(kv<=6.6)return e?'3.8/6.6':'6.6/6.6';if(kv<=11)return e?'6.35/11':'11/11';if(kv<=22)return '12.7/22';return '19/33'}
function gradeOf(f){return f.grade||autoGrade(f.V,f.earth)}
function findRow(lib,f){const L=lib[f.lib];return L?L.rows.find(r=>r.c===f.cores&&+r.mm===+f.mm)||null:null}
function sizesFor(lib,k,c){const L=lib[k];return L?L.rows.filter(r=>r.c===c).map(r=>+r.mm).sort((a,b)=>a-b):[]}
function coresFor(lib,k){const L=lib[k];return L?COREORD.filter(c=>L.rows.some(r=>r.c===c)):[]}
function loadCurrent(f){
  const P=+f.load||0,V=+f.V||1,pf=+f.pf||1,eff=f.type==='Motor'?(+f.eff||1):1;
  if(f.unit==='A')return P;
  if(f.phase==='DC')return P*1000/(V*eff);
  if(f.phase==='1P')return f.unit==='kVA'?P*1000/V:P*1000/(V*pf*eff);
  return f.unit==='kVA'?P*1000/(SQ3*V):P*1000/(SQ3*V*pf*eff);
}
function kTemp(hv,lay,S){if(S.tCorr===false)return 1;const t=TF[hv?'HV':'LV'];return lay==='A'?interp(t.air,S.tAir):interp(t.gnd,S.tGnd)}
function xFor(L,row,cores,mm,g){
  if(!L.hv)return{X:row.X,src:'Polycab 1.1 kV table'};
  const gi=GRADES.indexOf(g),tab=cores==='1C'?XA2:XA3,e=tab[+mm];
  if(e&&e[gi]!=null)return{X:e[gi],src:'IS Table '+(cores==='1C'?'A.2':'A.3')+', '+g+' kV',fix:XFIX[(cores==='1C'?'A2':'A3')+'|'+mm+'|'+g]};
  return{X:row.Xcat||0.09,src:'Polycab HT catalogue (no IS table entry)'};
}
function calc(f,S,lib){
  const r={f,S,errs:[]};
  const cl=vclass(f),typ=typOf(f);r.cl=cl;r.typ=typ;r.cat=cl+(typ==='Power'?'F':'M');
  const L=lib[f.lib],row=findRow(lib,f);r.L=L;r.row=row;
  if(!L)r.errs.push('Unknown cable type');
  if(L&&!row)r.errs.push('Size '+f.cores+'-'+f.mm+' is not in the library');
  if(L&&!L.hv&&(+f.V)>1100)r.errs.push('1.1 kV cable selected on a '+fm(f.V/1000,1)+' kV circuit');
  const n=Math.max(1,Math.round(+f.runs||1));r.n=n;
  if(L&&L.hv){r.grade=gradeOf(f);const U=parseFloat(r.grade.split('/')[1]);if(U*1000<(+f.V)*0.999)r.errs.push('Cable grade '+r.grade+' kV is below the system voltage')}
  r.Ib=loadCurrent(f);
  r.pf=f.phase==='DC'?1:Math.min(1,Math.max(0.01,+f.pf||1));r.sin=f.phase==='DC'?0:Math.sqrt(1-r.pf*r.pf);
  r.kph=f.phase==='3P'?SQ3:2;
  r.Lc=(+f.len||0)*(1+S.lenMargin/100);
  r.kG=pick(f.der,S.grp[cl][f.lay]);
  r.Iz=NaN;
  if(row){
    const useAlt=L.hv&&row.alt&&(r.grade==='12.7/22'||r.grade==='19/33');
    const src=useAlt?row.alt:row;
    const k={A:'air',G:'gnd',D:'duct'}[f.lay]+(!L.hv&&f.cores==='1C'&&f.phase!=='3P'?'2':'');
    r.base=src[k];r.baseNote=(useAlt?'22/33 kV value · ':'')+(!L.hv&&f.cores==='1C'?(f.phase==='3P'?'3 single-core cables · ':'2 single-core cables · '):'')+(L.hv&&f.cores==='1C'?'trefoil · ':'');
    r.kT=kTemp(L.hv,f.lay,S);
    if(!isNum(r.base))r.errs.push('No '+LAYN[f.lay].toLowerCase()+' rating for this cable');else r.Iz=r.base*n*r.kT*r.kG;
    r.R=row.R;r.Rsrc=row.rs==='IS'?'IS 8130 Table A.1 @ 90 °C':'Polycab LT catalogue AC R @ 90 °C';
    if(f.phase==='DC'){r.X=0;r.Xsrc='DC (resistance only)'}else{const xr=xFor(L,row,f.cores,f.mm,r.grade);r.X=xr.X;r.Xsrc=xr.src;r.Xfix=xr.fix}
  }
  r.okAmp=isFinite(r.Iz)&&r.Iz>=r.Ib;
  r.util=r.Ib/r.Iz*100;
  const V=+f.V||1;
  if(row){r.dvRun=r.kph*r.Ib*r.Lc/1000*(r.R*r.pf+r.X*r.sin)/n;r.pRun=r.dvRun/V*100}
  r.limRun=pick(f.vdr,S.lim[cl][typ].run);
  r.okRun=!!row&&r.pRun<=r.limRun;
  r.startApplies=typ==='Motor'&&f.phase!=='DC'&&['DOL','SD','SS'].includes(f.start);
  r.tol=pick(f.lrcTol,20);
  if(r.startApplies){
    const klr=+f.klr||0,tol=1+r.tol/100;
    r.stMult=f.start==='DOL'?klr*tol:f.start==='SD'?klr/3*tol:klr;
    r.Ist=r.Ib*r.stMult;r.pfs=Math.min(1,Math.max(0.01,+f.pfs||0.3));r.sins=Math.sqrt(1-r.pfs*r.pfs);
    if(row){r.dvSt=r.kph*r.Ist*r.Lc/1000*(r.R*r.pfs+r.X*r.sins)/n;r.pSt=r.dvSt/V*100}
    r.limSt=pick(f.vds,S.lim[cl].Motor.start);r.okSt=!!row&&r.pSt<=r.limSt;
  }else r.okSt=null;
  r.k=L?L.k:NaN;
  r.isc=pick(f.isc,ISC_DEF[cl]);
  if(cl==='LV'){r.okSC=null;r.scNA='Not applicable for LV feeders and LV motors'}
  else{
    r.t=pick(f.t,S.duty[f.duty]!=null?S.duty[f.duty]:0.2);r.tSrc=isNum(f.t)?'feeder value':'by feeder type';
    if(r.isc>0&&r.t>0&&L){r.Amin=r.isc*1000*Math.sqrt(r.t)/r.k;r.Aav=S.scShare?(+f.mm)*n:(+f.mm);r.okSC=r.Aav>=r.Amin}
    else{r.okSC=null;r.scNA='Not checked: fault level or withstand time is zero'}
  }
  r.ok=r.errs.length===0&&r.okAmp&&r.okRun&&r.okSt!==false&&r.okSC!==false;
  return r;
}
function recommend(f,S,lib){
  const sizes=sizesFor(lib,f.lib,f.cores),n0=Math.max(1,Math.round(+f.runs||1));
  for(let n=n0;n<=12;n++)for(const mm of sizes){if(calc(Object.assign({},f,{mm,runs:n}),S,lib).ok)return{mm,runs:n}}
  return null;
}
function cableLabel(f){const n=Math.max(1,Math.round(+f.runs||1));return f.cores==='1C'?`${n} × (3×1C-${f.mm})`:`${n} × ${f.cores}-${f.mm}`}
function status(r){if(!r.ok)return{k:'f',t:'FAIL'};if(r.rec&&r.rec.mm<+r.f.mm&&r.rec.runs<=(+r.f.runs||1))return{k:'w',t:'PASS · OVERSIZED'};return{k:'p',t:'PASS'}}
function applyMin(f,rec){if(!rec)return false;if(+f.mm===rec.mm&&+f.runs===rec.runs)return false;if(!f.orig)f.orig={mm:+f.mm,runs:+f.runs};f.mm=rec.mm;f.runs=rec.runs;return true}
function revert(f){if(!f.orig)return false;f.mm=f.orig.mm;f.runs=f.orig.runs;delete f.orig;return true}


function fm(x,d){if(x===null||x===undefined||x===''||!isFinite(x))return '—';return(+x).toLocaleString('en-GB',{minimumFractionDigits:d,maximumFractionDigits:d})}
const NUMF=['load','V','pf','eff','klr','pfs','mm','runs','len','lrcTol','der','vdr','vds','isc','t'];
const STRUCT=['lib','cores','type','phase','start','lay','grade','duty','unit','mm','earth'];
const PU=['pf','eff','pfs'];
const clampPU=v=>Math.min(1,Math.max(0.01,+v));

function fixSize(f){const sz=sizesFor(DEF_LIB,f.lib,f.cores);if(!sz.includes(+f.mm))f.mm=sz.find(x=>x>=+f.mm)||sz[sz.length-1]}
function applyField(f,k,val,S){
  const cl0=vclass(f),typ0=typOf(f),lay0=f.lay;
  f[k]=NUMF.includes(k)?(isNum(val)?+val:val):val;
  if(PU.includes(k)&&isNum(f[k]))f[k]=clampPU(f[k]);
  if(k==='lib'){const cs=coresFor(DEF_LIB,f.lib);if(!cs.includes(f.cores))f.cores=cs.includes('3C')?'3C':cs[0];fixSize(f);if(!DEF_LIB[f.lib].hv)f.grade=''}
  if(k==='cores')fixSize(f);
  if(k==='mm'||k==='runs')delete f.orig;
  if(k==='type'){if(f.type==='Motor'){f.duty='motor';if(f.unit==='kVA')f.unit='kW'}else if(f.duty==='motor')f.duty='plant'}
  if(vclass(f)!==cl0&&isNum(f.V))fillDefaults(f,S,'class');
  else if(typOf(f)!==typ0)fillDefaults(f,S,'type');
  else if(f.lay!==lay0)fillDefaults(f,S,'lay');
}
function run(f,S){const r=calc(f,S,DEF_LIB);r.rec=recommend(f,S,DEF_LIB);return r}
window.CSE={xFor,libShort:k=>({"HV-CU":"MV/HV Cu","HV-AL":"MV/HV Al","LV-CU":"LV Cu","LV-AL":"LV Al"})[k]||k,DEF_LIB,DEF_SET,ISC_DEF,GRADES,DUTY,DUTYN,LAYN,COREORD,F,fillDefaults,calc,recommend,run,cableLabel,status,applyMin,revert,sizesFor,coresFor,autoGrade,gradeOf,kTemp,simpleDefault,vclass,typOf,isNum,fm,applyField,loadCurrent};
})();

/* =====================================================================
   APP-WIDE HELPERS — version, print/share for iPhone, uppercase inputs
   ===================================================================== */
window.APP_VERSION = 'V2.1';

/* Open the given element in a new tab/window as a printable page.
   Works on iPhone Safari (user gets Share → Print → Save PDF) and
   on iPhone PWAs via a blob-URL fallback that invokes Share. */
window.appPrint = function(sel, title){
  var node = typeof sel === 'string' ? document.querySelector(sel) : sel;
  if (!node) return;
  var esc = function(s){ return String(s||'').replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  var t = esc(title || 'Report');
  var styles = [].slice.call(document.querySelectorAll('link[rel=stylesheet], style')).map(function(n){
    if (n.tagName === 'LINK') {
      try { return '<link rel="stylesheet" href="' + new URL(n.getAttribute('href'), location.href).href + '">'; }
      catch(e){ return n.outerHTML; }
    }
    return n.outerHTML;
  }).join('\n');
  var html = '<!doctype html><html><head><meta charset="utf-8"><title>' + t + '</title>' + styles +
    '<style>@page{size:A4;margin:12mm}html,body{margin:0;background:#fff;color:#000}' +
    'body{padding:14px;font-family:-apple-system,system-ui,Segoe UI,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}' +
    'article{box-shadow:none!important;max-width:100%!important;background:#fff!important}' +
    '#__appPrintBar{position:sticky;top:0;z-index:9;background:#fff;border-bottom:2px solid #ec3013;padding:10px 0 12px;margin:-14px -14px 14px;text-align:center}' +
    '#__appPrintBar button{padding:11px 22px;font:600 15px -apple-system,system-ui,sans-serif;background:#ec3013;color:#fff;border:0;cursor:pointer;letter-spacing:.02em}' +
    '#__appPrintBar p{margin:6px 0 0;font:12px/1.3 -apple-system,system-ui,sans-serif;color:#555}' +
    '@media print{#__appPrintBar{display:none!important}body{padding:0}}</style>' +
    '</head><body>' +
    '<div id="__appPrintBar"><button type="button" onclick="window.print()">Save as PDF / Print</button>' +
    '<p>On iPhone: tap the Share icon in the browser toolbar, then \u201CPrint\u201D or \u201CSave to Files\u201D.</p></div>' +
    node.outerHTML +
    '<scr' + 'ipt>setTimeout(function(){try{window.focus();window.print();}catch(e){}},800);</scr' + 'ipt>' +
    '</body></html>';
  var w = null;
  try { w = window.open('', '_blank'); } catch(e){}
  if (w && w.document) {
    try { w.document.open(); w.document.write(html); w.document.close(); return true; } catch(e){}
  }
  // Fallback: Blob URL — iOS can share/print from the opened page
  try {
    var blob = new Blob([html], {type:'text/html'});
    var url = URL.createObjectURL(blob);
    var w2 = window.open(url, '_blank');
    if (w2) return true;
    var a = document.createElement('a');
    a.href = url; a.download = (title || 'Report').replace(/[^\w\-]+/g,'_') + '.html';
    document.body.appendChild(a); a.click();
    setTimeout(function(){ a.remove(); URL.revokeObjectURL(url); }, 2000);
    return true;
  } catch(e) { return false; }
};

/* Share a text summary — iOS Share Sheet when available, else clipboard. */
window.appShareText = function(title, text){
  if (navigator.share) { return navigator.share({title: title||'', text: text||''}).catch(function(){}); }
  if (navigator.clipboard) { return navigator.clipboard.writeText(text||''); }
};

/* Force all text inputs to uppercase, both on-screen and in state.
   Capture-phase listener runs BEFORE React's synthetic handler, so when
   React reads e.target.value it sees the uppercased string and stores
   that in component state. */
(function(){
  function isTextInput(el){
    if (!el || el.tagName !== 'INPUT') return false;
    if (el.hasAttribute('data-no-upper')) return false;
    var t = (el.getAttribute('type') || 'text').toLowerCase();
    return t === 'text' || t === 'search' || t === '';
  }
  document.addEventListener('input', function(e){
    var t = e.target;
    if (!isTextInput(t)) return;
    var v = t.value || ''; var u = v.toUpperCase();
    if (u === v) return;
    var s = t.selectionStart, en = t.selectionEnd;
    t.value = u;
    try { t.setSelectionRange(s, en); } catch(err){}
  }, true);
  function tag(root){
    (root && root.querySelectorAll ? root : document).querySelectorAll('input').forEach(function(i){
      if (isTextInput(i) && !i.hasAttribute('data-upper-set')) {
        i.setAttribute('autocapitalize','characters');
        i.setAttribute('autocorrect','off');
        i.setAttribute('spellcheck','false');
        i.setAttribute('data-upper-set','1');
      }
    });
  }
  function start(){
    tag(document);
    try {
      new MutationObserver(function(muts){
        for (var i=0;i<muts.length;i++){
          muts[i].addedNodes && muts[i].addedNodes.forEach && muts[i].addedNodes.forEach(function(n){ if (n && n.nodeType === 1) tag(n); });
        }
      }).observe(document.body, {childList:true, subtree:true});
    } catch(e){}
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();