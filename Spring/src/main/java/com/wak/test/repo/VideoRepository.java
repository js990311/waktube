package com.wak.test.repo;

import com.wak.test.entity.Video;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.sql.Date;
import java.util.List;

@Slf4j
@Repository
@Transactional
public class VideoRepository {
//    @PersistenceContext
    private final EntityManager em;

    @Autowired
    public VideoRepository(EntityManager em) {
        this.em = em;
    }

    public Video find(String vid){
        Video video = em.find(Video.class, vid);
//        log.info(String.valueOf(video));
        return video;
    }

    public List<Video> findAll(){
        List<Video> lv = em.createQuery("Select v from Video v", Video.class).getResultList();
        return lv;
    }

//    public Video save(){
//        Video video = new Video();
//        video.setTitle("테스트제목");
//        video.setVid("test");
//        video.setUploadDate("2019-07-23");
//        video.setUploader("test-uploader");
//        video.setViews(1234);
//        em.persist(video);
//        return video;
//    }

}
