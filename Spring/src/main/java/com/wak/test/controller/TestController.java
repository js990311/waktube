package com.wak.test.controller;

import com.wak.test.entity.Video;
import com.wak.test.repo.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Controller
@RequestMapping("test")
public class TestController {

    private VideoRepository videoRepository;

    @Autowired
    public TestController(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    @GetMapping
    private String getTest(HttpServletRequest req, Model model, @RequestParam(defaultValue="false") Boolean timeAttackMode){
        HttpSession session = req.getSession(false);
        if(session == null){
            session = req.getSession();
            session.setAttribute("max-score", 0);
        }else{
            Integer maxScore = (Integer) session.getAttribute("max-score");
            Integer nowScore = (Integer) session.getAttribute("now-score");
            if(maxScore < nowScore){
                session.setAttribute("max-score", nowScore);
            }
        }
        session.setAttribute("timeAttackMode", timeAttackMode);

        List<Video> problems = videoRepository.findAll();
        session.setAttribute("problems", problems);
        session.setAttribute("now-score", 0);

        // 3개 뽑기
        List<Video> lv = new ArrayList<>();
        Collections.shuffle(problems);
        Integer tmp = 0, ret = problems.get(0).getViews();

        for(int num=1;num<=3;num++) {
            int i=0;
            while(Math.abs(tmp - ret) <= 500 && i <= 7){
                Collections.shuffle(problems);
                ret = problems.get(0).getViews();
                i += 1;
            }
            lv.add(problems.get(0));
            problems.remove(0);
            tmp = lv.get(lv.size()-1).getViews();
            ret = problems.get(0).getViews();
        }
        model.addAttribute("videos", lv);
        return "test";
    }

    @PostMapping
    @ResponseBody
    private Video postTest(HttpServletRequest req, @RequestParam Integer lastViews){
        HttpSession session = req.getSession(false);
        if(session == null){
            Video video = new Video();
            video.setVid("ERROR");
            video.setTitle("세션이 없는데요. 이거 어떻게 된거죠?");
            return video;
        }
        Integer nowScore = (Integer) session.getAttribute("now-score");
        session.setAttribute("now-score", nowScore + 1);
        List<Video> lv = (List<Video>) session.getAttribute("problems");
        Collections.shuffle(lv);
        // 랜덤으로 하나 뽑기
        Video ret = lv.get(0);

        int i=0, diff;
        if((nowScore+3) < 20){
            diff = 300;
        }else if((nowScore+3) < 40){
            diff = 250;
        }else if((nowScore+3) < 60){
            diff = 200;
        }else if((nowScore+3) < 80){
            diff = 150;
        }else{
            diff = 100;
        }
        while(Math.abs(ret.getViews() - lastViews) <= diff && i <= 7){
            Collections.shuffle(lv);
            ret = lv.get(0);
            i += 1;
        }

        // 뽑은 거 제거하기
        lv.remove(0);

        // REST-API로 돌려주기
        return ret;
    }

}
