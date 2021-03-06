import { MatchEvent } from './matchEvent';



export class MatchStream {
    match_id: string;
    live: boolean;
    matchEvent?: MatchEvent;
    mEventDeleted?: boolean;
    
    constructor(match_id: string, live: boolean){
        this.match_id = match_id;
        this.live = live;
    }
    
    setMatchEvent(matchEvent: MatchEvent){
        this.matchEvent = matchEvent;
    }
    
    setEventDeleted(wasDeleted: boolean){
        this.mEventDeleted = wasDeleted;
    }
    
}