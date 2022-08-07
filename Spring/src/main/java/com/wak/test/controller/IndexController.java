package com.wak.test.controller;

import com.wak.test.entity.Video;
import com.wak.test.repo.VideoRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Controller
public class IndexController {
    private final RestTemplate restConn = new RestTemplate(new HttpComponentsClientHttpRequestFactory());
//    private final String restUrl = "http://localhost:8081/lastUpdate";
    private final String restUrl = "http://flask/lastUpdate";
    private VideoRepository videoRepository;

    @Autowired
    public IndexController(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    @Getter @Setter
    public static class UpdateTime{
        private String year;
        private String month;
        private String day;
        private String hour;
        private String minute;
    }

    private UpdateTime getLastUpdate() throws IOException {
        restConn.getForObject(restUrl,String.class);
        UpdateTime resp = restConn.getForObject(restUrl, UpdateTime.class);
//        UpdateTime ret = resp.getBody();
        return resp;
    }

    @GetMapping("/")
    public String indexPage(HttpServletRequest req, Model model) throws IOException {
        HttpSession session = req.getSession(false);
        if(session == null){
            session = req.getSession();
            session.setAttribute("max-score", 0);
            List<Video> problems = videoRepository.findAll();
            Collections.shuffle(problems);
            session.setAttribute("problems", problems);
            session.setAttribute("now-score", 0);
        }
        List<Video> lv = (List<Video>) session.getAttribute("problems");
        model.addAttribute("bgVideo", lv.get(0));
        UpdateTime ret = getLastUpdate();
        model.addAttribute("lastUpdate", ret);
        return "index";
    }
}
