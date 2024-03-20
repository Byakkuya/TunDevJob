import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { PrismaClient } from '@prisma/client';
import  { JWT_SECRET } from '../secrets';
import { error } from 'console';
const prisma = new PrismaClient();

// JWT Strategy Options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

// JWT Strategy
passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // Find user by email
      const user = await prisma.user.findUnique({ where: { email: payload.email } });
      
      if (!user) {
        return done(error, false);
      }

      // Attach user object to request
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Middleware function to authenticate requests
export const authenticate = passport.authenticate('jwt', { session: false });
