(()=>{
'use strict';
const BUILD='2.1.0-20261004.3';
const KEY='trainingCoachAIStateV2';
const ORDER=['A','B','C','D'];
const PUMPS=['Chest','Back','Arms','Shoulders','Legs'];
const PROFILE_DEFAULT=`Training goal: hypertrophy-first while retaining most prior strength. Experienced lifter returning after a move-related layoff of roughly two months.
Current phase: re-entry. First two exposures of each workout should use reduced volume and generally 3–4 RIR before normal accumulation resumes.
Movement preferences/constraints: overhead pressing has historically irritated the shoulders; do not program it by default. Heavy RDLs and back squats have historically aggravated the low back/SI area. Front squats have been well tolerated. A 15-degree incline dumbbell press has been shoulder-friendly. Prior left hamstring strain is currently recovered, but rapid jumps in direct hamstring loading should be avoided and 24–48 hour response matters.
Programming preferences: 50–60 minute sessions when possible; exact set/rep/RIR/rest/load prescriptions; double progression; avoid needless exercise churn. Pump is a secondary indicator, not a goal by itself. DOMS often peaks on day two after a layoff.
Old-gym reference performance before the move: front squat 205 x 10; incline DB press 65 x 12/12/10; seated cable row 200 x 12 x 4; lat pulldown 130 x 12 x 3; multi-bar bench 205 x 10/10/9; leg extension 130 x 15/15/13; lying leg curl 70 x 15 x 3. Treat these as historical reference points, not automatic starting loads on new machines.
New community gym: dumbbells 2.5–75; hip abductor/adductor; seated leg curl and extension; seated chest press; pec deck; arm curl; triceps press; overhead press; ab and back extension; seated leg press; assisted dip; lat pulldown; seated row; Smith machine; squat rack; adjustable bench; barbell/bumper plates; adjustable cable crossover.`;

const PROGRAM={
 A:{name:'Workout A',focus:'Back + upper chest',role:'Primary back exposure with shoulder-friendly chest work',exercises:[
  {id:'rowA',name:'Seated Row',sets:3,min:8,max:12,rir:2.5,rest:2,inc:5,priority:'primary',note:'Controlled stretch and contraction; no torso heave.'},
  {id:'pulldownA',name:'Lat Pulldown',sets:3,min:8,max:12,rir:2.5,rest:2,inc:5,priority:'primary',note:'Full overhead stretch; drive elbows down.'},
  {id:'inclineA',name:'15° Incline DB Press',sets:3,min:8,max:12,rir:2.5,rest:2.5,inc:5,priority:'primary',starter:45,note:'Let the weaker side govern the set; pain-free path.'},
  {id:'pecdecA',name:'Pec Deck',sets:2,min:12,max:15,rir:2.5,rest:1.5,inc:5,priority:'secondary',note:'Stable chest volume with controlled stretch.'},
  {id:'latraiseA',name:'Cable Lateral Raise',sets:3,min:12,max:20,rir:2.5,rest:1.5,inc:2.5,priority:'secondary',note:'No swinging; keep shoulder comfortable.'},
  {id:'facepullA',name:'Face Pull',sets:2,min:15,max:20,rir:3,rest:1.5,inc:5,priority:'support',note:'Shoulder-support work; load is secondary.'}
 ]},
 B:{name:'Workout B',focus:'Quad emphasis',role:'Front-squat skill plus stable machine hypertrophy',exercises:[
  {id:'frontsquatB',name:'Front Squat',sets:3,min:6,max:10,rir:2.5,rest:3,inc:5,priority:'primary',starter:135,note:'Re-entry starts conservatively; do not chase the old 205 x 10.'},
  {id:'legpressB',name:'Seated Leg Press',sets:3,min:10,max:15,rir:2.5,rest:2.5,inc:10,priority:'primary',note:'Calibrate this specific machine before progressing.'},
  {id:'legextB',name:'Seated Leg Extension',sets:3,min:12,max:15,rir:2.5,rest:2,inc:10,priority:'primary',note:'Primary stable quad isolation.'},
  {id:'legcurlB',name:'Seated Leg Curl',sets:3,min:10,max:15,rir:2.5,rest:2,inc:5,priority:'primary',note:'Smooth reps; monitor hamstring response over 24–48 h.'},
  {id:'calfB',name:'Smith Calf Raise',sets:3,min:10,max:15,rir:2.5,rest:1.5,inc:10,priority:'secondary',note:'Pause in stretch and at peak contraction.'}
 ]},
 C:{name:'Workout C',focus:'Chest + arms + delts',role:'Stable pressing and focused arm/shoulder volume',exercises:[
  {id:'chestpressC',name:'Seated Chest Press',sets:3,min:8,max:12,rir:2.5,rest:2.5,inc:5,priority:'primary',note:'Calibrate machine; shoulder-friendly grip and path.'},
  {id:'pecdecC',name:'Pec Deck / Cable Fly',sets:2,min:12,max:15,rir:2.5,rest:1.5,inc:5,priority:'secondary',note:'Controlled stretch; no shoulder irritation.'},
  {id:'rowC',name:'Seated Row',sets:2,min:10,max:12,rir:3,rest:2,inc:5,priority:'secondary',note:'Secondary back exposure; do not turn it into A day.'},
  {id:'curlC',name:'Arm Curl Machine',sets:3,min:10,max:15,rir:2,rest:1.5,inc:5,priority:'primary',note:'No shoulder roll-forward.'},
  {id:'tricepsC',name:'Triceps Press Machine',sets:3,min:10,max:15,rir:2,rest:1.5,inc:5,priority:'primary',note:'Full controlled extension.'},
  {id:'reardeltC',name:'Reverse Pec Deck',sets:3,min:15,max:20,rir:2.5,rest:1.5,inc:5,priority:'secondary',note:'Rear delts, not traps.'},
  {id:'latraiseC',name:'Cable Lateral Raise',sets:2,min:15,max:20,rir:2.5,rest:1.5,inc:2.5,priority:'secondary',note:'Clean reps; stop before swinging.'}
 ]},
 D:{name:'Workout D',focus:'Lower / posterior',role:'Posterior-chain emphasis with deliberately secondary quad work',exercises:[
  {id:'legpressD',name:'High-Foot Seated Leg Press',sets:3,min:10,max:15,rir:2.5,rest:2.5,inc:10,priority:'primary',note:'Higher foot position; controlled depth.'},
  {id:'legcurlD',name:'Seated Leg Curl',sets:3,min:10,max:15,rir:2.5,rest:2,inc:5,priority:'primary',note:'Main hamstring progression exposure.'},
  {id:'splitD',name:'Smith Split Squat',sets:2,min:8,max:12,rir:3,rest:2,inc:5,priority:'secondary',note:'Per leg; stable stride and depth.'},
  {id:'legextD',name:'Seated Leg Extension',sets:2,min:15,max:20,rir:3,rest:2,inc:10,priority:'secondary',note:'Secondary quad exposure; keep easier than B.'},
  {id:'backextD',name:'Back Extension Machine',sets:2,min:12,max:15,rir:3,rest:1.5,inc:5,priority:'support',note:'Neutral spine; support work, not a max-load hinge.'},
  {id:'abductorD',name:'Hip Abductor',sets:2,min:15,max:20,rir:3,rest:1.5,inc:5,priority:'secondary',note:'Controlled range.'},
  {id:'adductorD',name:'Hip Adductor',sets:2,min:15,max:20,rir:3,rest:1.5,inc:5,priority:'secondary',note:'Controlled range.'}
 ]}
};

const TIMER_DEFAULT={status:'idle',startedAt:null,elapsedMs:0,workoutCode:null,endedAt:null,rest:{status:'idle',endsAt:null,remainingMs:0,label:'',exerciseId:null,setIndex:null,plannedMs:0}};
function freshTimer(){return clone(TIMER_DEFAULT)}

const baseline={
 sessions:[],timer:clone(TIMER_DEFAULT),nextWorkout:'B',exposures:{A:0,B:0,C:0,D:0},increments:{},profileNotes:PROFILE_DEFAULT,
 phase:'re-entry',coachMemory:'Re-entry after move-related layoff. Prior back work was performed informally before the first logged new-gym session, so begin the formal rotation with Workout B.',
 latestLocalReview:null,latestAiReview:null,nextPrescription:null,created:new Date().toISOString(),build:BUILD
};
let volatileStorage='';
let state=load();
let aiAvailable=false;
let aiModel='';
let deferredPrompt=null;
function clone(v){return JSON.parse(JSON.stringify(v))}
function getStore(){try{return localStorage.getItem(KEY)||''}catch{return volatileStorage}}
function setStore(v){try{localStorage.setItem(KEY,v)}catch{volatileStorage=v}}
function load(){try{const p=JSON.parse(getStore()||'{}');const pt=p.timer||{};return {...clone(baseline),...p,exposures:{...baseline.exposures,...(p.exposures||{})},increments:{...(p.increments||{})},sessions:Array.isArray(p.sessions)?p.sessions:[],timer:{...clone(TIMER_DEFAULT),...pt,rest:{...clone(TIMER_DEFAULT.rest),...(pt.rest||{})}}}}catch{return clone(baseline)}}
function save(){state.build=BUILD;setStore(JSON.stringify(state))}
function numeric(v){const n=parseFloat(v);return Number.isFinite(n)?n:null}
function today(){return new Date().toISOString().slice(0,10)}
function nextCode(c){return ORDER[(ORDER.indexOf(c)+1)%ORDER.length]}
function isReentry(c){return (state.exposures[c]||0)<2}
function phaseFor(c){return isReentry(c)?'re-entry':state.phase==='re-entry'?'accumulation':state.phase}
function effectiveSets(ex,c){return isReentry(c)?Math.max(2,Math.ceil(ex.sets*2/3)):ex.sets}
function targetRir(ex,c){return isReentry(c)?Math.max(3.5,ex.rir):ex.rir}
function incrementFor(ex){return Number(state.increments[ex.id]??ex.inc)}
function sessionsForExercise(id){return state.sessions.filter(s=>s.exercises?.some(e=>e.id===id))}
function lastExercise(id){const list=sessionsForExercise(id);if(!list.length)return null;const session=list[list.length-1];return {session,exercise:session.exercises.find(e=>e.id===id)}}
function escapeHtml(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function workoutTitle(code){return PROGRAM[code]?`${PROGRAM[code].name} — ${PROGRAM[code].focus}`:code}

function localRecommendation(ex,code){
 const last=lastExercise(ex.id);
 const re=isReentry(code);
 if(!last){
  if(ex.starter)return {headline:`Start around ${ex.starter} lb`,detail:`Use ${effectiveSets(ex,code)} work sets of ${ex.min}–${ex.max}; keep about ${targetRir(ex,code)} RIR. This is intentionally conservative.`,load:ex.starter};
  return {headline:'Calibrate this machine',detail:`Find a load for ${ex.min}–${ex.max} clean reps with about ${targetRir(ex,code)} RIR. Record it; do not chase the stack today.`,load:null};
 }
 const sets=last.exercise.sets.filter(x=>numeric(x.weight)!==null&&numeric(x.reps)!==null);
 if(!sets.length)return {headline:'Re-calibrate',detail:'The previous log has no usable working-set load.',load:null};
 const load=numeric(sets[0].weight);
 const lastSet=sets[sets.length-1];
 const lr=numeric(lastSet.rir);
 const reps=sets.map(x=>numeric(x.reps));
 const allTop=reps.every(r=>r>=ex.max);
 const anyBelow=reps.some(r=>r<ex.min);
 const recentSession=last.session;
 const highDoms=(numeric(recentSession.doms)||0)>=7;
 if(re)return {headline:`Repeat or make only a small adjustment`,detail:`Still in re-entry. Use the last successful load (${load} lb if comparable) and keep 3–4 RIR; avoid aggressive progression until this workout has two exposures.`,load};
 if(recentSession.painFlag)return {headline:'Do not auto-progress',detail:'The last exposure included a pain/injury-type symptom. Keep the load conservative and resolve the symptom before progression.',load};
 if(highDoms&&['legextD','legcurlD','legpressD','splitD'].includes(ex.id))return {headline:'Hold secondary lower-body load',detail:'Recent DOMS was high; keep the secondary D exposure easier rather than matching B-day intensity.',load};
 if(allTop&&lr!==null&&lr>=1.5&&ex.priority!=='support')return {headline:`Earned load increase`,detail:`All work sets reached the top of the range and the last set retained usable RIR. Try ${(load+incrementFor(ex)).toFixed(incrementFor(ex)%1?1:0)} lb and return to the lower-middle of the rep range.`,load:load+incrementFor(ex)};
 if(anyBelow||lr!==null&&lr<.5)return {headline:'Hold or reduce slightly',detail:`Do not add load. Rebuild clean reps in the ${ex.min}–${ex.max} range and keep the last set out of a grinder.`,load};
 return {headline:`Hold ${load} lb and add reps`,detail:`Keep the load until all work sets own the top of the ${ex.min}–${ex.max} range near the target RIR.`,load};
}

function analyzeLocal(session){
 const flags=[];const wins=[];const adjustments=[];
 const doms=numeric(session.doms),ready=numeric(session.readiness);
 if(session.painFlag){flags.push('Pain/injury-type symptom was reported. Do not use automatic load progression on the affected movement; stop any movement that reproduces sharp/localized pain and consider clinical evaluation if it persists or is significant.');}
 if(doms!==null&&doms>=8)adjustments.push('DOMS is very high. Keep the next exposure for the sore muscle group submaximal or delay it until normal movement is comfortable.');
 if(ready!==null&&ready<=4)adjustments.push('Readiness was low; interpret any performance drop as fatigue before treating it as lost strength.');
 const analyses=[];
 for(const logged of session.exercises){
  const base=Object.values(PROGRAM).flatMap(w=>w.exercises).find(e=>e.id===logged.id);if(!base)continue;
  const sets=logged.sets.filter(s=>numeric(s.weight)!==null&&numeric(s.reps)!==null);if(!sets.length)continue;
  const top=sets.every(s=>numeric(s.reps)>=base.max);const lastR=numeric(sets[sets.length-1].rir);const firstW=numeric(sets[0].weight);const lastW=numeric(sets[sets.length-1].weight);
  let decision='hold';let reason='Build repetitions and execution before adding load.';
  if(isReentry(session.code)){decision='hold';reason='Re-entry exposure: preserve 3–4 RIR and avoid chasing old numbers.'}
  else if(session.painFlag){decision='hold';reason='Pain flag overrides normal progression.'}
  else if(top&&lastR!==null&&lastR>=1.5&&base.priority!=='support'){decision='increase';reason='Top of rep range was achieved across working sets with usable RIR.'}
  else if(lastR!==null&&lastR<=.5){decision='hold';reason='The final set was too close to failure for an automatic load increase.'}
  if(firstW!==null&&lastW!==null)analyses.push({name:logged.name,decision,reason,load:lastW});
 }
 const trained=Object.entries(session.pumps||{}).filter(([,v])=>numeric(v)!==null);
 const strongPumps=trained.filter(([,v])=>numeric(v)>=6&&numeric(v)<=8).map(([k])=>k);
 if(strongPumps.length)wins.push(`Productive pump range in ${strongPumps.join(', ')} without needing to chase a 9–10.`);
 const next=nextCode(session.code);
 if(isReentry(next))adjustments.push(`${PROGRAM[next].name} remains a re-entry exposure: use reduced volume and 3–4 RIR.`);
 return {created:new Date().toISOString(),sessionId:session.id,summary:`${workoutTitle(session.code)} saved. ${flags.length?'Recovery/safety flags override normal progression.':'Progress conservatively from actual performance rather than old-gym numbers.'}`,wins,flags,adjustments,exerciseAnalysis:analyses,nextWorkout:next};
}

function prescriptionFor(code){
 if(state.nextPrescription&&state.nextPrescription.code===code)return state.nextPrescription;
 return null;
}
function prescriptionExercise(p,id){return p?.exercises?.find(x=>x.exercise_id===id)||null}

function renderDashboard(){
 const code=state.nextWorkout||'B';const w=PROGRAM[code];
 document.getElementById('phasePill').textContent=phaseFor(code).replace(/^./,c=>c.toUpperCase());
 document.getElementById('nextWorkoutTitle').textContent=`Next: ${w.name}`;
 const ai=state.nextPrescription&&state.nextPrescription.code===code;
 document.getElementById('nextWorkoutSubtitle').textContent=ai?`${w.focus} • AI prescription available`:`${w.focus} • ${isReentry(code)?`re-entry exposure ${(state.exposures[code]||0)+1}/2`:w.role}`;
 document.getElementById('coachAction').textContent=state.latestAiReview?.recommended_action==='rest'?`AI recommends a recovery day before ${w.name}.`:'';
 document.getElementById('rotationStat').textContent=[code,nextCode(code),nextCode(nextCode(code)),nextCode(nextCode(nextCode(code)))].join(' → ');
 const bw=[...state.sessions].reverse().find(s=>numeric(s.bodyweight)!==null)?.bodyweight;
 document.getElementById('weightStat').textContent=bw?`${bw} lb`:'—';
 document.getElementById('sessionCount').textContent=state.sessions.length;
 document.getElementById('aiStatus').textContent=aiAvailable?(aiModel||'Connected'):'Local coach';
 document.getElementById('coachStateText').textContent=state.coachMemory||'No coach memory yet.';
 const sum=document.getElementById('latestCoachSummary');
 if(state.latestAiReview)sum.innerHTML=`<strong>${escapeHtml(state.latestAiReview.session_grade||'AI review')}</strong> — ${escapeHtml(state.latestAiReview.session_assessment||'')}`;
 else if(state.latestLocalReview)sum.textContent=state.latestLocalReview.summary;
 else sum.textContent='No post-workout review yet.';
 const recent=document.getElementById('recentSessions');
 if(!state.sessions.length){recent.className='empty';recent.textContent='No sessions logged yet.'}else{recent.className='';recent.innerHTML=state.sessions.slice(-3).reverse().map(sessionCardHtml).join('')}
}
function renderProgram(){
 document.getElementById('programCards').innerHTML=ORDER.map(code=>{const w=PROGRAM[code];return `<article class="program-card"><div class="head"><div><h3>${w.name} — ${w.focus}</h3><small>${w.role}</small></div><span class="pill">${phaseFor(code)}</span></div>${w.exercises.map(ex=>`<div class="exercise-line"><strong>${escapeHtml(ex.name)}</strong><span>${effectiveSets(ex,code)} × ${ex.min}–${ex.max}</span><span>${targetRir(ex,code)} RIR</span></div>`).join('')}</article>`}).join('');
}
function populateWorkoutSelect(){const sel=document.getElementById('workoutSelect');sel.innerHTML=ORDER.map(c=>`<option value="${c}">${PROGRAM[c].name} — ${PROGRAM[c].focus}</option>`).join('');sel.value=state.nextWorkout||'B'}
function renderLogger(){
 const code=document.getElementById('workoutSelect').value||state.nextWorkout||'B';const w=PROGRAM[code];const re=isReentry(code);const p=prescriptionFor(code);
 document.getElementById('logPhaseHint').textContent=re?`Re-entry exposure ${(state.exposures[code]||0)+1}/2: reduced volume, usually 3–4 RIR.`:`${w.role}. Progress by performance, RIR and recovery.`;
 const banner=document.getElementById('prescriptionBanner');
 if(p){banner.hidden=false;banner.innerHTML=`<strong>AI prescription applied:</strong> ${escapeHtml(p.phase_note||'Use the coach targets below.')}`;}else banner.hidden=true;
 document.getElementById('exerciseLogger').innerHTML=w.exercises.map(ex=>{
  const px=prescriptionExercise(p,ex.id);const sets=px?.sets??effectiveSets(ex,code);const min=px?.rep_min??ex.min;const max=px?.rep_max??ex.max;const rir=px?.target_rir??targetRir(ex,code);const rest=px?.rest_min??ex.rest;const local=localRecommendation(ex,code);const suggested=px?.load_text||((local.load!==null&&local.load!==undefined)?String(local.load):'');
  const rows=Array.from({length:sets},(_,i)=>`<div class="set-row" data-ex="${ex.id}" data-set="${i}"><div class="setnum">${i+1}</div><label>Wt<input class="weight" type="number" step="0.5" inputmode="decimal" value="${/^\d+(\.\d+)?$/.test(suggested)?suggested:''}" placeholder="lb"></label><label>Reps<input class="reps" type="number" inputmode="numeric" placeholder="${min}"></label><label>RIR<input class="rir" type="number" step="0.5" inputmode="decimal" placeholder="${rir}"></label><label>Rest<input class="rest" type="number" step="0.5" inputmode="decimal" value="${rest}"></label></div><div class="set-action-row"><button type="button" class="secondary small complete-set-btn" data-ex="${ex.id}" data-set="${i}">Complete set</button><span class="set-complete-status">Rest timer will use ${rest} min</span></div>`).join('');
  const rec=px?`AI: ${px.decision||'prescribed'} — ${px.rationale||''} ${px.load_text?`Target load: ${px.load_text}.`:''}`:`${local.headline}. ${local.detail}`;
  return `<article class="exercise-card" data-id="${ex.id}"><div class="ex-head"><div><h3>${escapeHtml(ex.name)}</h3><p>${sets} sets • ${min}–${max} reps • target ${rir} RIR • ${rest} min rest</p></div></div><div class="recommendation">${escapeHtml(rec)}</div>${rows}<label class="exercise-note">Exercise note<input class="ex-note" type="text" placeholder="Technique, pain, machine setting, etc."></label></article>`;
 }).join('');
 renderPumps();
}
function renderPumps(){document.getElementById('pumpGrid').innerHTML=PUMPS.map(p=>`<label>${p}<input class="pump-input" data-pump="${p}" type="number" min="1" max="10" step="1" inputmode="numeric"></label>`).join('')}
function collectSession(){
 const code=document.getElementById('workoutSelect').value;const w=PROGRAM[code];
 const exercises=w.exercises.map(ex=>{const card=document.querySelector(`.exercise-card[data-id="${ex.id}"]`);const sets=[...card.querySelectorAll('.set-row')].map(row=>({weight:numeric(row.querySelector('.weight').value),reps:numeric(row.querySelector('.reps').value),rir:numeric(row.querySelector('.rir').value),rest:numeric(row.querySelector('.rest').value),completedAt:row.dataset.completedAt||null})).filter(s=>s.weight!==null||s.reps!==null);return {id:ex.id,name:ex.name,sets,note:card.querySelector('.ex-note').value.trim()}});
 const pumps={};document.querySelectorAll('.pump-input').forEach(i=>{const v=numeric(i.value);if(v!==null)pumps[i.dataset.pump]=v});
 return {id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,date:document.getElementById('dateInput').value||today(),code,workout:w.name,focus:w.focus,bodyweight:numeric(document.getElementById('bodyweightInput').value),duration:numeric(document.getElementById('durationInput').value),durationSeconds:state.timer?.status==='ended'?Math.round((state.timer.elapsedMs||0)/1000):null,readiness:numeric(document.getElementById('readinessInput').value),doms:numeric(document.getElementById('domsInput').value),pre:document.getElementById('preInput').value.trim(),intra:document.getElementById('intraInput').value.trim(),painFlag:document.getElementById('painToggle').checked,painNotes:document.getElementById('painNotes').value.trim(),pumps,notes:document.getElementById('sessionNotes').value.trim(),exercises,phase:phaseFor(code),created:new Date().toISOString()};
}
function sessionCardHtml(s){const pumps=Object.entries(s.pumps||{}).map(([k,v])=>`${k} ${v}`).join(' • ');return `<article class="history-card"><div class="history-head"><strong>${escapeHtml(s.date)} — ${escapeHtml(workoutTitle(s.code))}</strong><span class="decision">${escapeHtml(s.phase||'')}</span></div><div class="history-meta">${s.bodyweight?`${s.bodyweight} lb • `:''}${s.duration?`${s.duration} min • `:''}${pumps||'No pump ratings'}</div>${s.notes?`<div class="muted">${escapeHtml(s.notes)}</div>`:''}</article>`}
function renderHistory(){const root=document.getElementById('historyList');root.innerHTML=state.sessions.length?state.sessions.slice().reverse().map(sessionCardHtml).join(''):'<div class="empty">No sessions logged yet.</div>'}
function renderSettings(){document.getElementById('profileNotes').value=state.profileNotes||PROFILE_DEFAULT;const unique=[...new Map(ORDER.flatMap(c=>PROGRAM[c].exercises).map(e=>[e.id,e])).values()];document.getElementById('incrementSettings').innerHTML=unique.map(ex=>`<div class="increment-row"><span>${escapeHtml(ex.name)}</span><input class="inc-input" data-id="${ex.id}" type="number" step="0.5" value="${incrementFor(ex)}"></div>`).join('');document.querySelectorAll('.inc-input').forEach(i=>i.addEventListener('change',()=>{state.increments[i.dataset.id]=Number(i.value);save()}))}
function renderLocalLogic(){const r=state.latestLocalReview;const root=document.getElementById('localLogicOutput');if(!r){root.textContent='No session analyzed yet.';return}root.innerHTML=`<p>${escapeHtml(r.summary)}</p>${r.flags.length?`<h4>Flags</h4><ul>${r.flags.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul>`:''}${r.adjustments.length?`<h4>Program/recovery logic</h4><ul>${r.adjustments.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul>`:''}<h4>Exercise decisions</h4><ul>${r.exerciseAnalysis.map(x=>`<li><strong>${escapeHtml(x.name)}</strong>: ${escapeHtml(x.decision)} — ${escapeHtml(x.reason)}</li>`).join('')}</ul>`}
function renderAiReview(){const a=state.latestAiReview;const root=document.getElementById('coachOutput');if(!a){root.innerHTML='<p class="muted">No AI review yet. Local analysis still drives the app when AI is unavailable.</p>';return}root.innerHTML=`<h3>${escapeHtml(a.session_grade||'Session review')}</h3><p>${escapeHtml(a.session_assessment||'')}</p>${a.key_takeaways?.length?`<h4>Key takeaways</h4><ul>${a.key_takeaways.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul>`:''}${a.exercise_analysis?.length?`<h4>Exercise analysis</h4><ul>${a.exercise_analysis.map(x=>`<li><strong>${escapeHtml(x.exercise_name)}</strong> <span class="decision">${escapeHtml(x.decision)}</span><br>${escapeHtml(x.assessment)}<br><span class="muted">Next: ${escapeHtml(x.next_load_text)} • ${x.next_sets} × ${x.next_rep_min}–${x.next_rep_max} • RIR ${x.target_rir} • rest ${x.rest_min} min. ${escapeHtml(x.rationale)}</span></li>`).join('')}</ul>`:''}${a.program_adjustments?.length?`<h4>Program adjustments</h4><ul>${a.program_adjustments.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul>`:''}${a.recovery_flags?.length?`<h4>Recovery flags</h4><ul>${a.recovery_flags.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul>`:''}<h4>Next ${escapeHtml(a.next_workout?.code||'')} workout</h4><p>${escapeHtml(a.next_workout?.phase_note||'')}</p><button id="applyAiBtn" class="secondary">Apply AI prescription to next workout</button>`;const btn=document.getElementById('applyAiBtn');if(btn)btn.addEventListener('click',applyAiPrescription)}
function renderAll(){renderDashboard();renderProgram();renderHistory();renderSettings();renderLocalLogic();renderAiReview();updateTimerUI()}
function go(view){document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));const target=document.getElementById(view);if(target)target.classList.add('active');document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view===view));if(view==='log'){const active=['running','paused'].includes(state.timer?.status);if(!active){populateWorkoutSelect();renderLogger()}updateTimerUI()}try{scrollTo(0,0)}catch{}}
function download(name,type,content){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([content],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function csv(){const rows=[['date','workout','bodyweight','duration','readiness','doms','pain','pumps','notes']];state.sessions.forEach(s=>rows.push([s.date,s.code,s.bodyweight,s.duration,s.readiness,s.doms,s.painFlag,Object.entries(s.pumps||{}).map(([k,v])=>`${k}:${v}`).join('|'),s.notes]));return rows.map(r=>r.map(v=>`"${String(v??'').replaceAll('"','""')}"`).join(',')).join('\n')}
function resetForm(){['bodyweightInput','durationInput','readinessInput','domsInput','preInput','sessionNotes','painNotes'].forEach(id=>document.getElementById(id).value='');document.getElementById('painToggle').checked=false;document.getElementById('painFields').hidden=true}

async function checkAi(){try{const r=await fetch('/api/health',{cache:'no-store'});if(!r.ok)throw new Error();const j=await r.json();aiAvailable=!!j.ai;aiModel=j.model||''}catch{aiAvailable=false;aiModel=''}const text=aiAvailable?`Connected to ${aiModel}. API credentials remain server-side.`:'AI server not connected. Local coaching remains fully functional. Run the included Node server with OPENAI_API_KEY to enable AI review.';document.getElementById('aiSettingsText').textContent=text;renderDashboard()}
async function runAiReview(){
 if(!state.sessions.length){alert('Log at least one workout first.');return}
 if(!aiAvailable){alert('AI review is not connected. The standalone/local-file version uses the built-in coaching engine. See the README to enable server-side AI.');go('coach');return}
 const loading=document.getElementById('coachLoading');loading.hidden=false;go('coach');
 try{const r=await fetch('/api/coach',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:{profileNotes:state.profileNotes,coachMemory:state.coachMemory,phase:state.phase,nextWorkout:state.nextWorkout,exposures:state.exposures,sessions:state.sessions.slice(-12)},currentSession:state.sessions[state.sessions.length-1],program:PROGRAM})});const j=await r.json();if(!r.ok)throw new Error(j.error||'AI review failed');state.latestAiReview=j.review;state.coachMemory=j.review.coach_memory_update||state.coachMemory;save();renderAll();go('coach')}catch(e){alert(`AI review failed: ${e.message}`)}finally{loading.hidden=true}
}
function applyAiPrescription(){const a=state.latestAiReview;if(!a?.next_workout)return;const nw=a.next_workout;state.nextPrescription={code:nw.code,phase_note:nw.phase_note,exercises:nw.exercises};state.nextWorkout=nw.code;save();renderAll();alert(`AI prescription applied to ${nw.code}.`)}

function formatWorkoutClock(ms){const total=Math.max(0,Math.floor(ms/1000));const h=Math.floor(total/3600);const m=Math.floor((total%3600)/60);const sec=total%60;return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`}
function formatRestClock(ms){const total=Math.max(0,Math.ceil(ms/1000));const m=Math.floor(total/60);const sec=total%60;return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`}
function workoutElapsedMs(){const t=state.timer||TIMER_DEFAULT;return Math.max(0,(t.elapsedMs||0)+(t.status==='running'&&t.startedAt?Date.now()-t.startedAt:0))}
function timerIsActive(){return ['running','paused'].includes(state.timer?.status)}
function resetRestTimer(message='Tap “Complete set” after a set; the prescribed rest countdown starts automatically.'){state.timer.rest={...clone(TIMER_DEFAULT.rest),label:message}}
function notifyRestComplete(){try{if(navigator.vibrate)navigator.vibrate([180,100,180])}catch{}try{const AC=window.AudioContext||window.webkitAudioContext;if(AC){const ctx=new AC();const osc=ctx.createOscillator();const gain=ctx.createGain();osc.connect(gain);gain.connect(ctx.destination);osc.frequency.value=880;gain.gain.setValueAtTime(.08,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.35);osc.start();osc.stop(ctx.currentTime+.35);setTimeout(()=>ctx.close().catch(()=>{}),500)}}catch{}}
function completeRestTimer(){const r=state.timer.rest;if(r.status!=='running')return;r.status='complete';r.endsAt=null;r.remainingMs=0;r.label='Rest complete — begin the next set when ready.';save();notifyRestComplete();updateTimerUI()}
function updateTimerUI(){const display=document.getElementById('workoutTimerDisplay');if(!display)return;const t=state.timer||TIMER_DEFAULT;const elapsed=workoutElapsedMs();display.textContent=formatWorkoutClock(elapsed);const status=document.getElementById('workoutTimerStatus');const start=document.getElementById('startTrainingBtn'),pause=document.getElementById('pauseWorkoutBtn'),resume=document.getElementById('resumeWorkoutBtn'),end=document.getElementById('endWorkoutBtn');start.hidden=t.status!=='idle';pause.hidden=t.status!=='running';resume.hidden=t.status!=='paused';end.hidden=t.status!=='paused';document.querySelector('.training-timer-card')?.classList.toggle('timer-paused',t.status==='paused');const sel=document.getElementById('workoutSelect');if(sel)sel.disabled=timerIsActive();if(t.status==='idle')status.textContent='Not started';else if(t.status==='running')status.textContent=`Training in progress • ${workoutTitle(t.workoutCode||document.getElementById('workoutSelect')?.value||'')}`;else if(t.status==='paused')status.textContent='Workout paused — paused time is excluded from duration.';else status.textContent=`Workout ended • ${(elapsed/60000).toFixed(1)} min recorded.`;
 const r=t.rest||TIMER_DEFAULT.rest;const restDisplay=document.getElementById('restTimerDisplay'),restStatus=document.getElementById('restTimerStatus'),add=document.getElementById('add30RestBtn'),skip=document.getElementById('skipRestBtn');let remaining=0;if(r.status==='running'){remaining=Math.max(0,(r.endsAt||Date.now())-Date.now());if(remaining<=0){completeRestTimer();return}}else if(r.status==='paused')remaining=Math.max(0,r.remainingMs||0);restDisplay.textContent=(r.status==='idle')?'--:--':formatRestClock(remaining);restDisplay.classList.toggle('done',r.status==='complete');restStatus.textContent=r.label||'Rest timer ready.';const restActive=['running','paused'].includes(r.status);add.hidden=!restActive;skip.hidden=!restActive}
function startTraining(){if(timerIsActive())return;const code=document.getElementById('workoutSelect').value||state.nextWorkout||'B';state.timer={...clone(TIMER_DEFAULT),status:'running',startedAt:Date.now(),elapsedMs:0,workoutCode:code,rest:clone(TIMER_DEFAULT.rest)};document.getElementById('durationInput').value='';save();updateTimerUI()}
function pauseWorkout(){const t=state.timer;if(t.status!=='running')return;t.elapsedMs=workoutElapsedMs();t.startedAt=null;t.status='paused';const r=t.rest;if(r.status==='running'){r.remainingMs=Math.max(0,(r.endsAt||Date.now())-Date.now());r.endsAt=null;r.status='paused';r.label=`Rest paused • ${r.label.replace(/^Resting[^•]*•?\s*/,'')||'resume when ready'}`}save();updateTimerUI()}
function resumeWorkout(){const t=state.timer;if(t.status!=='paused')return;t.status='running';t.startedAt=Date.now();const r=t.rest;if(r.status==='paused'&&r.remainingMs>0){r.endsAt=Date.now()+r.remainingMs;r.status='running';r.label=r.label.replace(/^Rest paused •\s*/,'Resting • ')}save();updateTimerUI()}
function endWorkout(){const t=state.timer;if(t.status!=='paused')return;t.status='ended';t.endedAt=Date.now();t.startedAt=null;resetRestTimer('Workout ended. Rest timer stopped.');const mins=t.elapsedMs/60000;document.getElementById('durationInput').value=mins.toFixed(1);save();updateTimerUI()}
function addRestTime(ms=30000){const r=state.timer.rest;if(r.status==='running')r.endsAt=(r.endsAt||Date.now())+ms;else if(r.status==='paused')r.remainingMs=(r.remainingMs||0)+ms;save();updateTimerUI()}
function skipRest(){resetRestTimer('Rest skipped.');save();updateTimerUI()}
function hasLaterIncompleteSet(button){const buttons=[...document.querySelectorAll('.complete-set-btn')];const idx=buttons.indexOf(button);return buttons.slice(idx+1).some(b=>b.dataset.completed!=='1')}
function startRestForSet(button){if(state.timer.status!=='running'){alert('Start training before completing sets so the workout and rest timers can be tracked.');return}if(button.dataset.completed==='1')return;const card=button.closest('.exercise-card');const row=card?.querySelector(`.set-row[data-set="${button.dataset.set}"]`);if(!row)return;const reps=numeric(row.querySelector('.reps').value);if(reps===null){alert('Enter the reps for this set before marking it complete.');row.querySelector('.reps').focus();return}row.dataset.completedAt=new Date().toISOString();row.classList.add('completed');button.dataset.completed='1';button.textContent='Set complete ✓';button.classList.add('completed');button.disabled=true;const status=button.parentElement.querySelector('.set-complete-status');if(status)status.textContent='Logged';if(!hasLaterIncompleteSet(button)){resetRestTimer('Final programmed set complete.');save();updateTimerUI();return}const restMin=numeric(row.querySelector('.rest').value)??0;const plannedMs=Math.max(0,restMin*60000);if(plannedMs<=0){resetRestTimer('No rest countdown prescribed for this set.');save();updateTimerUI();return}const exName=card.querySelector('h3')?.textContent||'set';const nextSet=Number(button.dataset.set)+2;state.timer.rest={status:'running',endsAt:Date.now()+plannedMs,remainingMs:plannedMs,label:`Resting after ${exName}, set ${Number(button.dataset.set)+1} • target ${restMin} min`,exerciseId:button.dataset.ex,setIndex:Number(button.dataset.set),plannedMs};save();updateTimerUI()}

function bind(){
 document.getElementById('startTrainingBtn').addEventListener('click',startTraining);document.getElementById('pauseWorkoutBtn').addEventListener('click',pauseWorkout);document.getElementById('resumeWorkoutBtn').addEventListener('click',resumeWorkout);document.getElementById('endWorkoutBtn').addEventListener('click',endWorkout);document.getElementById('add30RestBtn').addEventListener('click',()=>addRestTime(30000));document.getElementById('skipRestBtn').addEventListener('click',skipRest);document.getElementById('exerciseLogger').addEventListener('click',e=>{const b=e.target.closest('.complete-set-btn');if(b)startRestForSet(b)});
 document.querySelectorAll('.nav-btn').forEach(b=>b.addEventListener('click',()=>go(b.dataset.view)));document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
 document.getElementById('startNextBtn').addEventListener('click',()=>{if(timerIsActive()){go('log');return}populateWorkoutSelect();document.getElementById('workoutSelect').value=state.nextWorkout||'B';renderLogger();go('log')});
 document.getElementById('workoutSelect').addEventListener('change',e=>{if(timerIsActive()){e.target.value=state.timer.workoutCode;return}renderLogger()});
 document.getElementById('painToggle').addEventListener('change',e=>{document.getElementById('painFields').hidden=!e.target.checked});
 document.getElementById('workoutForm').addEventListener('submit',async e=>{e.preventDefault();if(timerIsActive()){alert('Pause the workout and press End workout before saving so the duration is recorded automatically.');return}const s=collectSession();if(!s.exercises.some(x=>x.sets.length)){alert('Enter at least one exercise set before saving.');return}state.sessions.push(s);state.exposures[s.code]=(state.exposures[s.code]||0)+1;state.nextWorkout=nextCode(s.code);state.nextPrescription=null;state.latestLocalReview=analyzeLocal(s);if(ORDER.every(c=>(state.exposures[c]||0)>=2)&&state.phase==='re-entry')state.phase='accumulation';state.timer=clone(TIMER_DEFAULT);save();resetForm();renderAll();go('coach');if(aiAvailable)await runAiReview()});
 document.getElementById('dashboardAiBtn').addEventListener('click',runAiReview);document.getElementById('coachAiBtn').addEventListener('click',runAiReview);
 document.getElementById('exportBtn').addEventListener('click',()=>download('training-coach-ai-backup.json','application/json',JSON.stringify(state,null,2)));document.getElementById('exportCsvBtn').addEventListener('click',()=>download('training-coach-ai-sessions.csv','text/csv',csv()));
 document.getElementById('importInput').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;try{const imported=JSON.parse(await f.text());if(!Array.isArray(imported.sessions))throw new Error('Missing sessions');state={...clone(baseline),...imported};save();renderAll();alert('Backup imported.')}catch(err){alert(`Import failed: ${err.message}`)}});
 document.getElementById('saveProfileBtn').addEventListener('click',()=>{state.profileNotes=document.getElementById('profileNotes').value.trim();save();alert('Training profile saved.')});
 document.getElementById('resetBtn').addEventListener('click',()=>{if(confirm('Reset all workout history, AI reviews and progression data?')){state=clone(baseline);save();populateWorkoutSelect();renderLogger();renderAll();go('dashboard')}});
 window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;const b=document.getElementById('installBtn');b.hidden=false;b.onclick=async()=>{deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;b.hidden=true}});
}
function init(){document.getElementById('dateInput').value=today();populateWorkoutSelect();if(timerIsActive()&&state.timer.workoutCode)document.getElementById('workoutSelect').value=state.timer.workoutCode;renderLogger();renderAll();bind();checkAi();setInterval(updateTimerUI,250);if('serviceWorker' in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('sw.js').catch(()=>{});const test=new URLSearchParams(location.search).get('autotest');if(test){setTimeout(()=>{document.getElementById('startNextBtn').click();if(test==='timers'){const reps=document.querySelector('.set-row .reps'),rest=document.querySelector('.set-row .rest');if(reps)reps.value='10';if(rest)rest.value='0.01';document.getElementById('startTrainingBtn').click();setTimeout(()=>{document.querySelector('.complete-set-btn')?.click();setTimeout(()=>{document.getElementById('pauseWorkoutBtn').click();const paused=state.timer.status==='paused'&&state.timer.elapsedMs>500;document.getElementById('resumeWorkoutBtn').click();setTimeout(()=>{document.getElementById('pauseWorkoutBtn').click();document.getElementById('endWorkoutBtn').click();const duration=numeric(document.getElementById('durationInput').value);const restDone=['complete','idle'].includes(state.timer.rest.status);document.body.dataset.autotest=(paused&&duration>0&&restDone)?'PASS':'FAIL'},350)},800)},650)}else document.body.dataset.autotest=document.getElementById('log').classList.contains('active')?'PASS':'FAIL'},50)}}
window.addEventListener('error',e=>{const box=document.getElementById('fatalError');if(box){box.hidden=false;box.textContent=`App error: ${e.message}\n${e.filename||''}:${e.lineno||''}`}});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
