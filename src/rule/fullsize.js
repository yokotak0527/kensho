export default (Kensho)=>{
    let rule  = Kensho.rule;

    /**
     *
     * @arg {(string|string[])} val                -
     * @arg {Object}            [param={}]         -
     * @arg {boolean}           [param.trim=false] -
     * @arg {boolean}           [param.empty=true] -
     * @arg {string}            [type='']          - input type based on Kensho's own sorting rule
     * @arg {HTMLELement[]}     [elem=false]       - 
     */
    let fullsizeFunc = function(val, param = {}, type = '', elem = false){
        if(Array.isArray(val)){
            let result = true;
            val.forEach( v => {
                if(!fullsizeFunc(v, param, type, elem)) result = false;
            });
            return result;
        }else{
            if(val === null) return false;

            let result  = true;

            let trim    = typeof param.trim  === 'boolean' ? param.trim  : false;
            let empty   = typeof param.empty === 'boolean' ? param.empty : true;
            let is2byte = Kensho.plugin.get('is2byte');

            if(trim) val = val.trim();
            if ( val.length === 0 ) return empty ? true : false;

            for(let i = 0, l = val.length; i < l; i++){
                if(!is2byte.func(val[i])){
                    result = false;
                    break;
                };
            }
            return result;
        }
    }
    rule.add('fullsize', fullsizeFunc);

};