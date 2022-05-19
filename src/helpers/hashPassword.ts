var bcrypt = require("bcrypt");

export const hash=async (password:string)=>{
    const salt = await bcrypt.genSalt(10);
    const passwprdHash = await bcrypt.hash(password, salt);  

    return passwprdHash;
}


export const hashCompare=async (password:string, comparePass:string)=>{
    let valid=await bcrypt.compare(password, comparePass);
    return valid;
}
