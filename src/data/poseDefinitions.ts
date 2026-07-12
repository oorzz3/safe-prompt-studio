import type{PoseDefinition,V2Option}from'../types/builderV3'
export const poseModes:V2Option[]=[['standing','一般站姿人像'],['seated','一般坐姿人像'],['dynamic','動態人像'],['stretch','伸展動作'],['yoga','瑜珈動作'],['custom','自訂姿態']].map(([id,z])=>({id,labelZh:z,labelEn:id,prompt:{zh:z,en:id}}))
const p=(id:string,mode:string,z:string,en:string,implied:Record<string,string>,locked:string[],views:string[],frames:string[],heights=['cam-eye','cam-low']):PoseDefinition=>({id,mode,labelZh:z,labelEn:en,prompt:{zh:z,en},impliedValues:implied,lockedFields:locked,allowedValues:{'camera.subjectView':views,'camera.framing':frames,'camera.height':heights},explanation:`${z}只鎖定完成動作所需結構，攝影機方向仍可自由選擇。`})
const views=['view-front','view-three-front','view-side','view-three-side','view-back'],frames=['frame-full','frame-thigh','frame-half','frame-portrait']
export const poseDefinitions:PoseDefinition[]=[
p('pose-natural-standing','standing','自然站姿','standing naturally',{'pose.handPosition':'hands-natural','pose.legPosition':'legs-straight'},[],views,frames,['cam-eye','cam-low','cam-high']),
p('pose-side-standing','standing','側身站立','standing in side profile',{'pose.legPosition':'legs-bent'},[],views,frames),
p('pose-look-back','standing','轉身回望','turning with a gentle look back',{'camera.subjectView':'view-back','pose.headDirection':'head-look-back'},[],['view-back','view-three-side'],['frame-full','frame-thigh','frame-half']),
p('pose-seated','seated','自然坐姿','seated naturally',{'pose.handPosition':'hands-thigh','pose.legPosition':'legs-seated'},[],views,['frame-full','frame-thigh','frame-half']),
p('pose-walking','dynamic','自然行走','walking naturally',{'pose.legPosition':'legs-step'},[],views,['frame-full','frame-thigh']),
p('pose-side-stretch','stretch','側向伸展','performing a side stretch',{'pose.handPosition':'hands-up','pose.legPosition':'legs-straight'},[],views,['frame-full','frame-thigh']),
p('pose-warrior','yoga','戰士式','a stable professional warrior yoga pose',{'pose.handPosition':'hands-yoga-extension','pose.legPosition':'legs-yoga','camera.framing':'frame-full'},['pose.legPosition'],views,['frame-full']),
p('pose-down-dog','yoga','下犬式','a stable professional downward-facing dog pose with extended ground support',{'pose.handPosition':'hands-ground','pose.legPosition':'legs-ground-extended','camera.framing':'frame-full'},['pose.handPosition','pose.legPosition'],views,['frame-full']),
p('pose-cat-cow','yoga','貓牛式','a stable professional cat-cow yoga pose in floor quadruped support',{'pose.handPosition':'hands-ground','pose.legPosition':'legs-kneeling','camera.framing':'frame-full'},['pose.handPosition','pose.legPosition'],views,['frame-full','frame-thigh']),
p('pose-seated-fold','yoga','坐姿前屈','a controlled seated forward fold',{'pose.handPosition':'hands-forward','pose.legPosition':'legs-seated-extended','camera.framing':'frame-full'},['pose.legPosition'],views,['frame-full','frame-thigh']),
p('pose-bridge','yoga','溫和橋式','a gentle supported bridge pose with floor-supine support',{'pose.handPosition':'hands-arms-grounded','pose.legPosition':'legs-knees-grounded','camera.framing':'frame-full'},['pose.handPosition','pose.legPosition'],views,['frame-full']),
p('pose-neutral','custom','自訂姿態','a custom coherent pose',{},[],views,frames,['cam-eye','cam-low','cam-high'])]
export const getPose=(id:string)=>poseDefinitions.find(x=>x.id===id)
