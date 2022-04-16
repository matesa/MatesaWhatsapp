FROM quay.io/lyfe00011/bot:beta
RUN git clone https://github.com/matesa/MatesaWhatsapp.git /root/LyFE/
RUN mv /root/bottus/* /root/LyFE/
WORKDIR /root/LyFE/
ENV TZ=Europe/Istanbul
CMD ["node", "bot.js"]
