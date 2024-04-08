import {Injectable, Logger, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    // HTTP 관련 로거 인스턴스 생성
  private logger = new Logger('HTTP');

    // express의 app.use와 유사한 문법
    use(req: Request, res: Response, next: NextFunction) {
      // 로거 호출
      // res의 finish 이벤트 발생시(res가 완료될 때), 로그 또 찍어주기
      res.on('finish', () => {
        this.logger.log(
            `${req.method} ${req.originalUrl} has has been excuted`,
        );
      });

      next();
    }
}
