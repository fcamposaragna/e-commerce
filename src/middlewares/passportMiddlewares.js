import passport from 'passport';

export const passportCall = (strategy) => {
    return async(req,res,next) =>{
        passport.authenticate(strategy,function(err,user,info){
            if(err) return next(err);
            if(!user) return res.send({error:info.message?info.message:info.toString()});
            req.user = user;
            next();
        })(req,res,next);
    }
}