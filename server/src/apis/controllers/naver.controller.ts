import dotenv from 'dotenv';
import passport from 'passport';
import { Request, Response } from 'express';
import { getAxiosFromNaverApi } from '../utils/axios';
import { DEVELOPMENT } from '../config/constants';

dotenv.config();

const clientURL =
  process.env.NODE_ENV === DEVELOPMENT
    ? process.env.CLIENT_URL_DEVELOPMENT
    : process.env.CLIENT_URL_PRODUCTION;

export default {
  getGeoCodingFromCoords: async (req: Request, res: Response) => {
    const { lat, lng } = req.query;

    const url = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${lng},${lat}&sourcecrs=epsg:4326&orders=legalcode&output=json`;

    try {
      const data = await getAxiosFromNaverApi(url);

      if (clientURL) {
        res.setHeader('Access-Control-Allow-origin', clientURL);
      }
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send({
        ok: false,
        message: '좌표값을 기반으로 주소를 가져오지 못했습니다! :('
      });
    }
  },
  naverPassportLogin: passport.authenticate('naver', {
    authType: 'reprompt'
  }),
  naverPassportLogout: (req: Request, res: Response) => {
    req.logout(err => {
      if (err) {
        throw new Error();
      }
      res.redirect(`${clientURL}`);
    });
  },
  naverPassportAuthMiddleware: passport.authenticate('naver', {
    successRedirect: `${clientURL}`,
    failureRedirect: `${clientURL}`
  })
};
