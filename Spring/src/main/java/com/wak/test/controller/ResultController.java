package com.wak.test.controller;

import com.wak.test.entity.Video;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("result")
public class ResultController {

    @GetMapping
    private String resultPage(HttpServletRequest req, Model model){
        HttpSession session = req.getSession(false);
        if(session == null){
            session = req.getSession();
            session.setAttribute("max-score", 0);
            session.setAttribute("now-score", 0);
            session.setAttribute("timeAttackMode", false);
        }
        Integer maxScore = (Integer) session.getAttribute("max-score");
        Integer nowScore = (Integer) session.getAttribute("now-score");
        if(maxScore < nowScore){
            session.setAttribute("max-score", nowScore);
        }
        Integer ret = (Integer) session.getAttribute("now-score") + 3;
        List<Video> lv = (List<Video>) session.getAttribute("problems");
        ret += lv.size();
        model.addAttribute("problems", ret);
        model.addAttribute("bgVideo", lv.get(0));
        return "result";
    }
}
