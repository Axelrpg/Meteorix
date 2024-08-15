export const setVideoBackground = (condition: string) => {
    
    const fixedCondition = condition.trimStart().trimEnd();

    switch (fixedCondition) {
        case 'Partly Cloudy':
            return 'https://videos.pexels.com/video-files/855005/855005-hd_1920_1080_30fps.mp4';
        case 'Moderate rain':
            return 'https://videos.pexels.com/video-files/2491284/2491284-uhd_2732_1440_24fps.mp4';
        case 'Patchy rain nearby':
            return 'https://videos.pexels.com/video-files/2491284/2491284-uhd_2732_1440_24fps.mp4';
        default:
            return 'https://videos.pexels.com/video-files/5271943/5271943-hd_1920_1080_25fps.mp4';
    }
};