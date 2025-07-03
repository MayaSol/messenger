<template>
    <div class="emoji-menu" 
        role="menu" 
        aria-labelledby="menu-label-0" 
        id=""
        @click="handleEmojiClick($event)">
        <button role="menuitem" aria-selected=""
            aria-label="😀, grinning, grinning_face" title="grinning, grinning_face" class="emoji "
            id="emo-😀">😀</button>
            <button role="menuitem" aria-selected=""
            aria-label="😃, grinning_face_with_big_eyes, smiley" title="grinning_face_with_big_eyes, smiley"
            class="emoji " id="emo-😃">😃</button>
            <button role="menuitem" aria-selected=""
            aria-label="😄, grinning_face_with_closed_eyes, smile" title="grinning_face_with_closed_eyes, smile"
            class="emoji " id="emo-😄">😄</button>
            <button role="menuitem" aria-selected=""
            aria-label="😁, beaming_face, grin" title="beaming_face, grin" class="emoji " id="emo-😁">😁</button>
            <button
            role="menuitem" aria-selected="" aria-label="😆, laughing, lol, satisfied, squinting_face"
            title="laughing, lol, satisfied, squinting_face" class="emoji " id="emo-😆">😆</button>
            <button
            role="menuitem" aria-selected="" aria-label="😅, grinning_face_with_sweat, sweat_smile"
            title="grinning_face_with_sweat, sweat_smile" class="emoji " id="emo-😅">😅</button>
            <button role="menuitem"
            aria-selected="" aria-label="🤣, rofl" title="rofl" class="emoji " id="emo-🤣">🤣</button>
            <button
            role="menuitem" aria-selected="" aria-label="😂, joy, lmao, tears_of_joy" title="joy, lmao, tears_of_joy"
            class="emoji " id="emo-😂">😂</button>
            <button role="menuitem" aria-selected=""
            aria-label="🙂, slightly_smiling_face" title="slightly_smiling_face" class="emoji "
            id="emo-🙂">🙂</button>
            <button role="menuitem" aria-selected="" aria-label="🙃, upside_down_face"
            title="upside_down_face" class="emoji " id="emo-🙃">🙃</button>
            <button role="menuitem" aria-selected=""
            aria-label="🫠, melt, melting_face" title="melt, melting_face" class="emoji " id="emo-🫠">🫠</button>
            <button
            role="menuitem" aria-selected="" aria-label="😉, wink, winking_face" title="wink, winking_face"
            class="emoji " id="emo-😉">😉</button>
            <button role="menuitem" aria-selected=""
            aria-label="😊, blush, smiling_face_with_closed_eyes" title="blush, smiling_face_with_closed_eyes"
            class="emoji " id="emo-😊">😊</button>
            <button role="menuitem" aria-selected=""
            aria-label="😇, halo, innocent" title="halo, innocent" class="emoji " id="emo-😇">😇</button>
            <button
            role="menuitem" aria-selected="" aria-label="🥰, smiling_face_with_3_hearts"
            title="smiling_face_with_3_hearts" class="emoji " id="emo-🥰">🥰</button>
            <button role="menuitem"
            aria-selected="" aria-label="😍, heart_eyes, smiling_face_with_heart_eyes"
            title="heart_eyes, smiling_face_with_heart_eyes" class="emoji " id="emo-😍">😍</button>
            <button
            role="menuitem" aria-selected="" aria-label="🤩, star_struck" title="star_struck" class="emoji "
            id="emo-🤩">🤩</button>
            <button role="menuitem" aria-selected=""
            aria-label="😘, blowing_a_kiss, kissing_heart" title="blowing_a_kiss, kissing_heart" class="emoji "
            id="emo-😘">😘</button>
            <button role="menuitem" aria-selected="" aria-label="😗, kissing, kissing_face"
            title="kissing, kissing_face" class="emoji " id="emo-😗">😗</button>
            <button role="menuitem" aria-selected=""
            aria-label="☺️, relaxed, smiling_face" title="relaxed, smiling_face" class="emoji "
            id="emo-☺️">☺️</button>
            <button role="menuitem" aria-selected=""
            aria-label="😚, kissing_closed_eyes, kissing_face_with_closed_eyes"
            title="kissing_closed_eyes, kissing_face_with_closed_eyes" class="emoji " id="emo-😚">😚</button>
            <button
            role="menuitem" aria-selected="" aria-label="😙, kissing_face_with_smiling_eyes, kissing_smiling_eyes"
            title="kissing_face_with_smiling_eyes, kissing_smiling_eyes" class="emoji " id="emo-😙">😙</button>
            <button
            role="menuitem" aria-selected="" aria-label="🥲, smiling_face_with_tear" title="smiling_face_with_tear"
            class="emoji " id="emo-🥲">🥲</button>
            <button role="menuitem" aria-selected=""
            aria-label="😋, savoring_food, yum" title="savoring_food, yum" class="emoji " id="emo-😋">😋</button>
            <button
            role="menuitem" aria-selected="" aria-label="😛, face_with_tongue, stuck_out_tongue"
            title="face_with_tongue, stuck_out_tongue" class="emoji " id="emo-😛">😛</button>
            <button role="menuitem"
            aria-selected="" aria-label="😜, stuck_out_tongue_winking_eye" title="stuck_out_tongue_winking_eye"
            class="emoji " id="emo-😜">😜</button><button role="menuitem" aria-selected=""
            aria-label="🤪, zany, zany_face" title="zany, zany_face" class="emoji " id="emo-🤪">🤪</button><button
            role="menuitem" aria-selected="" aria-label="😝, stuck_out_tongue_closed_eyes"
            title="stuck_out_tongue_closed_eyes" class="emoji " id="emo-😝">😝</button><button role="menuitem"
            aria-selected="" aria-label="🤑, money_mouth_face" title="money_mouth_face" class="emoji "
            id="emo-🤑">🤑</button><button role="menuitem" aria-selected="" aria-label="🤗, hug, hugging, hugging_face"
            title="hug, hugging, hugging_face" class="emoji " id="emo-🤗">🤗</button><button role="menuitem"
            aria-selected="" aria-label="🤭, face_with_hand_over_mouth, hand_over_mouth"
            title="face_with_hand_over_mouth, hand_over_mouth" class="emoji " id="emo-🤭">🤭</button><button
            role="menuitem" aria-selected="" aria-label="🫢, face_with_open_eyes_hand_over_mouth, gasp"
            title="face_with_open_eyes_hand_over_mouth, gasp" class="emoji " id="emo-🫢">🫢</button><button
            role="menuitem" aria-selected="" aria-label="🫣, face_with_peeking_eye, peek"
            title="face_with_peeking_eye, peek" class="emoji " id="emo-🫣">🫣</button><button role="menuitem"
            aria-selected="" aria-label="🤫, shush, shushing_face" title="shush, shushing_face" class="emoji "
            id="emo-🤫">🤫</button><button role="menuitem" aria-selected=""
            aria-label="🤔, thinking, thinking_face, wtf" title="thinking, thinking_face, wtf" class="emoji "
            id="emo-🤔">🤔</button><button role="menuitem" aria-selected="" aria-label="🫡, salute, saluting_face"
            title="salute, saluting_face" class="emoji " id="emo-🫡">🫡</button><button role="menuitem" aria-selected=""
            aria-label="🤐, zipper_mouth, zipper_mouth_face" title="zipper_mouth, zipper_mouth_face" class="emoji "
            id="emo-🤐">🤐</button><button role="menuitem" aria-selected=""
            aria-label="🤨, face_with_raised_eyebrow, raised_eyebrow" title="face_with_raised_eyebrow, raised_eyebrow"
            class="emoji " id="emo-🤨">🤨</button><button role="menuitem" aria-selected=""
            aria-label="😐️, neutral, neutral_face" title="neutral, neutral_face" class="emoji "
            id="emo-😐️">😐️</button><button role="menuitem" aria-selected=""
            aria-label="😑, expressionless, expressionless_face" title="expressionless, expressionless_face"
            class="emoji " id="emo-😑">😑</button><button role="menuitem" aria-selected="" aria-label="😶, no_mouth"
            title="no_mouth" class="emoji " id="emo-😶">😶</button><button role="menuitem" aria-selected=""
            aria-label="🫥, dotted_line_face" title="dotted_line_face" class="emoji " id="emo-🫥">🫥</button><button
            role="menuitem" aria-selected="" aria-label="😶‍🌫️, in_clouds" title="in_clouds" class="emoji "
            id="emo-😶‍🌫️">😶‍🌫️</button><button role="menuitem" aria-selected=""
            aria-label="😏, smirk, smirking, smirking_face" title="smirk, smirking, smirking_face" class="emoji "
            id="emo-😏">😏</button><button role="menuitem" aria-selected="" aria-label="😒, unamused, unamused_face"
            title="unamused, unamused_face" class="emoji " id="emo-😒">😒</button><button role="menuitem"
            aria-selected="" aria-label="🙄, rolling_eyes" title="rolling_eyes" class="emoji "
            id="emo-🙄">🙄</button><button role="menuitem" aria-selected="" aria-label="😬, grimacing, grimacing_face"
            title="grimacing, grimacing_face" class="emoji " id="emo-😬">😬</button><button role="menuitem"
            aria-selected="" aria-label="😮‍💨, exhale, exhaling" title="exhale, exhaling" class="emoji "
            id="emo-😮‍💨">😮‍💨</button><button role="menuitem" aria-selected="" aria-label="🤥, lying, lying_face"
            title="lying, lying_face" class="emoji " id="emo-🤥">🤥</button><button role="menuitem" aria-selected=""
            aria-label="😌, relieved, relieved_face" title="relieved, relieved_face" class="emoji "
            id="emo-😌">😌</button><button role="menuitem" aria-selected="" aria-label="😔, pensive, pensive_face"
            title="pensive, pensive_face" class="emoji " id="emo-😔">😔</button><button role="menuitem" aria-selected=""
            aria-label="😪, sleepy, sleepy_face" title="sleepy, sleepy_face" class="emoji "
            id="emo-😪">😪</button><button role="menuitem" aria-selected="" aria-label="🤤, drooling, drooling_face"
            title="drooling, drooling_face" class="emoji " id="emo-🤤">🤤</button><button role="menuitem"
            aria-selected="" aria-label="😴, sleeping, sleeping_face" title="sleeping, sleeping_face" class="emoji "
            id="emo-😴">😴</button><button role="menuitem" aria-selected="" aria-label="😷, mask, medical_mask"
            title="mask, medical_mask" class="emoji " id="emo-😷">😷</button><button role="menuitem" aria-selected=""
            aria-label="🤒, face_with_thermometer" title="face_with_thermometer" class="emoji "
            id="emo-🤒">🤒</button><button role="menuitem" aria-selected="" aria-label="🤕, face_with_head_bandage"
            title="face_with_head_bandage" class="emoji " id="emo-🤕">🤕</button><button role="menuitem"
            aria-selected="" aria-label="🤢, nauseated, nauseated_face" title="nauseated, nauseated_face" class="emoji "
            id="emo-🤢">🤢</button><button role="menuitem" aria-selected="" aria-label="🤮, face_vomiting, vomiting"
            title="face_vomiting, vomiting" class="emoji " id="emo-🤮">🤮</button><button role="menuitem"
            aria-selected="" aria-label="🤧, sneezing, sneezing_face" title="sneezing, sneezing_face" class="emoji "
            id="emo-🤧">🤧</button><button role="menuitem" aria-selected="" aria-label="🥵, hot, hot_face"
            title="hot, hot_face" class="emoji " id="emo-🥵">🥵</button><button role="menuitem" aria-selected=""
            aria-label="🥶, cold, cold_face" title="cold, cold_face" class="emoji " id="emo-🥶">🥶</button><button
            role="menuitem" aria-selected="" aria-label="🥴, woozy, woozy_face" title="woozy, woozy_face" class="emoji "
            id="emo-🥴">🥴</button><button role="menuitem" aria-selected="" aria-label="😵, dizzy_face, knocked_out"
            title="dizzy_face, knocked_out" class="emoji " id="emo-😵">😵</button><button role="menuitem"
            aria-selected="" aria-label="😵‍💫, dizzy_eyes" title="dizzy_eyes" class="emoji "
            id="emo-😵‍💫">😵‍💫</button><button role="menuitem" aria-selected="" aria-label="🤯, exploding_head"
            title="exploding_head" class="emoji " id="emo-🤯">🤯</button><button role="menuitem" aria-selected=""
            aria-label="🤠, cowboy, cowboy_face" title="cowboy, cowboy_face" class="emoji "
            id="emo-🤠">🤠</button><button role="menuitem" aria-selected=""
            aria-label="🥳, hooray, partying, partying_face" title="hooray, partying, partying_face" class="emoji "
            id="emo-🥳">🥳</button><button role="menuitem" aria-selected="" aria-label="🥸, disguised, disguised_face"
            title="disguised, disguised_face" class="emoji " id="emo-🥸">🥸</button><button role="menuitem"
            aria-selected="" aria-label="😎, smiling_face_with_sunglasses, sunglasses_cool, too_cool"
            title="smiling_face_with_sunglasses, sunglasses_cool, too_cool" class="emoji "
            id="emo-😎">😎</button><button role="menuitem" aria-selected="" aria-label="🤓, nerd, nerd_face"
            title="nerd, nerd_face" class="emoji " id="emo-🤓">🤓</button><button role="menuitem" aria-selected=""
            aria-label="🧐, face_with_monocle" title="face_with_monocle" class="emoji " id="emo-🧐">🧐</button><button
            role="menuitem" aria-selected="" aria-label="😕, confused, confused_face" title="confused, confused_face"
            class="emoji " id="emo-😕">😕</button><button role="menuitem" aria-selected=""
            aria-label="🫤, face_with_diagonal_mouth" title="face_with_diagonal_mouth" class="emoji "
            id="emo-🫤">🫤</button><button role="menuitem" aria-selected="" aria-label="😟, worried, worried_face"
            title="worried, worried_face" class="emoji " id="emo-😟">😟</button><button role="menuitem" aria-selected=""
            aria-label="🙁, slightly_frowning_face" title="slightly_frowning_face" class="emoji "
            id="emo-🙁">🙁</button><button role="menuitem" aria-selected="" aria-label="☹️, white_frowning_face"
            title="white_frowning_face" class="emoji " id="emo-☹️">☹️</button><button role="menuitem" aria-selected=""
            aria-label="😮, face_with_open_mouth, open_mouth" title="face_with_open_mouth, open_mouth" class="emoji "
            id="emo-😮">😮</button><button role="menuitem" aria-selected="" aria-label="😯, hushed, hushed_face"
            title="hushed, hushed_face" class="emoji " id="emo-😯">😯</button><button role="menuitem" aria-selected=""
            aria-label="😲, astonished, astonished_face" title="astonished, astonished_face" class="emoji "
            id="emo-😲">😲</button><button role="menuitem" aria-selected="" aria-label="😳, flushed, flushed_face"
            title="flushed, flushed_face" class="emoji " id="emo-😳">😳</button><button role="menuitem" aria-selected=""
            aria-label="🥺, pleading, pleading_face" title="pleading, pleading_face" class="emoji "
            id="emo-🥺">🥺</button><button role="menuitem" aria-selected=""
            aria-label="🥹, face_holding_back_tears, watery_eyes" title="face_holding_back_tears, watery_eyes"
            class="emoji " id="emo-🥹">🥹</button><button role="menuitem" aria-selected=""
            aria-label="😦, frowning, frowning_face" title="frowning, frowning_face" class="emoji "
            id="emo-😦">😦</button><button role="menuitem" aria-selected="" aria-label="😧, anguished, anguished_face"
            title="anguished, anguished_face" class="emoji " id="emo-😧">😧</button><button role="menuitem"
            aria-selected="" aria-label="😨, fearful, fearful_face" title="fearful, fearful_face" class="emoji "
            id="emo-😨">😨</button><button role="menuitem" aria-selected=""
            aria-label="😰, anxious, anxious_face, cold_sweat" title="anxious, anxious_face, cold_sweat" class="emoji "
            id="emo-😰">😰</button><button role="menuitem" aria-selected=""
            aria-label="😥, disappointed_relieved, sad_relieved_face" title="disappointed_relieved, sad_relieved_face"
            class="emoji " id="emo-😥">😥</button><button role="menuitem" aria-selected=""
            aria-label="😢, cry, crying_face" title="cry, crying_face" class="emoji " id="emo-😢">😢</button><button
            role="menuitem" aria-selected="" aria-label="😭, loudly_crying_face, sob" title="loudly_crying_face, sob"
            class="emoji " id="emo-😭">😭</button><button role="menuitem" aria-selected=""
            aria-label="😱, scream, screaming_in_fear" title="scream, screaming_in_fear" class="emoji "
            id="emo-😱">😱</button><button role="menuitem" aria-selected="" aria-label="😖, confounded, confounded_face"
            title="confounded, confounded_face" class="emoji " id="emo-😖">😖</button><button role="menuitem"
            aria-selected="" aria-label="😣, persevere, persevering_face" title="persevere, persevering_face"
            class="emoji " id="emo-😣">😣</button><button role="menuitem" aria-selected=""
            aria-label="😞, disappointed, disappointed_face" title="disappointed, disappointed_face" class="emoji "
            id="emo-😞">😞</button><button role="menuitem" aria-selected="" aria-label="😓, downcast_face, sweat"
            title="downcast_face, sweat" class="emoji " id="emo-😓">😓</button><button role="menuitem" aria-selected=""
            aria-label="😩, weary, weary_face" title="weary, weary_face" class="emoji " id="emo-😩">😩</button><button
            role="menuitem" aria-selected="" aria-label="😫, tired, tired_face" title="tired, tired_face" class="emoji "
            id="emo-😫">😫</button><button role="menuitem" aria-selected="" aria-label="🥱, yawn, yawning, yawning_face"
            title="yawn, yawning, yawning_face" class="emoji " id="emo-🥱">🥱</button><button role="menuitem"
            aria-selected="" aria-label="😤, nose_steam, triumph" title="nose_steam, triumph" class="emoji "
            id="emo-😤">😤</button><button role="menuitem" aria-selected="" aria-label="😡, pout, pouting_face, rage"
            title="pout, pouting_face, rage" class="emoji " id="emo-😡">😡</button><button role="menuitem"
            aria-selected="" aria-label="😠, angry, angry_face" title="angry, angry_face" class="emoji "
            id="emo-😠">😠</button><button role="menuitem" aria-selected=""
            aria-label="🤬, censored, face_with_symbols_on_mouth" title="censored, face_with_symbols_on_mouth"
            class="emoji " id="emo-🤬">🤬</button><button role="menuitem" aria-selected="" aria-label="😈, smiling_imp"
            title="smiling_imp" class="emoji " id="emo-😈">😈</button><button role="menuitem" aria-selected=""
            aria-label="👿, angry_imp, imp" title="angry_imp, imp" class="emoji " id="emo-👿">👿</button><button
            role="menuitem" aria-selected="" aria-label="💀, skull" title="skull" class="emoji "
            id="emo-💀">💀</button><button role="menuitem" aria-selected="" aria-label="☠️, skull_and_crossbones"
            title="skull_and_crossbones" class="emoji " id="emo-☠️">☠️</button><button role="menuitem" aria-selected=""
            aria-label="💩, poop, shit" title="poop, shit" class="emoji " id="emo-💩">💩</button><button role="menuitem"
            aria-selected="" aria-label="🤡, clown, clown_face" title="clown, clown_face" class="emoji "
            id="emo-🤡">🤡</button><button role="menuitem" aria-selected="" aria-label="👹, japanese_ogre, ogre"
            title="japanese_ogre, ogre" class="emoji " id="emo-👹">👹</button><button role="menuitem" aria-selected=""
            aria-label="👺, goblin, japanese_goblin" title="goblin, japanese_goblin" class="emoji "
            id="emo-👺">👺</button><button role="menuitem" aria-selected="" aria-label="👻, ghost" title="ghost"
            class="emoji " id="emo-👻">👻</button><button role="menuitem" aria-selected="" aria-label="👽️, alien"
            title="alien" class="emoji " id="emo-👽️">👽️</button><button role="menuitem" aria-selected=""
            aria-label="👾, alien_monster, space_invader" title="alien_monster, space_invader" class="emoji "
            id="emo-👾">👾</button><button role="menuitem" aria-selected="" aria-label="🤖, robot, robot_face"
            title="robot, robot_face" class="emoji " id="emo-🤖">🤖</button><button role="menuitem" aria-selected=""
            aria-label="😺, grinning_cat, smiley_cat" title="grinning_cat, smiley_cat" class="emoji "
            id="emo-😺">😺</button><button role="menuitem" aria-selected=""
            aria-label="😸, grinning_cat_with_closed_eyes, smile_cat" title="grinning_cat_with_closed_eyes, smile_cat"
            class="emoji " id="emo-😸">😸</button><button role="menuitem" aria-selected=""
            aria-label="😹, joy_cat, tears_of_joy_cat" title="joy_cat, tears_of_joy_cat" class="emoji "
            id="emo-😹">😹</button><button role="menuitem" aria-selected=""
            aria-label="😻, heart_eyes_cat, smiling_cat_with_heart_eyes"
            title="heart_eyes_cat, smiling_cat_with_heart_eyes" class="emoji " id="emo-😻">😻</button><button
            role="menuitem" aria-selected="" aria-label="😼, smirk_cat, wry_smile_cat" title="smirk_cat, wry_smile_cat"
            class="emoji " id="emo-😼">😼</button><button role="menuitem" aria-selected="" aria-label="😽, kissing_cat"
            title="kissing_cat" class="emoji " id="emo-😽">😽</button><button role="menuitem" aria-selected=""
            aria-label="🙀, scream_cat, weary_cat" title="scream_cat, weary_cat" class="emoji "
            id="emo-🙀">🙀</button><button role="menuitem" aria-selected="" aria-label="😿, crying_cat"
            title="crying_cat" class="emoji " id="emo-😿">😿</button><button role="menuitem" aria-selected=""
            aria-label="😾, pouting_cat" title="pouting_cat" class="emoji " id="emo-😾">😾</button><button
            role="menuitem" aria-selected="" aria-label="🙈, see_no_evil" title="see_no_evil" class="emoji "
            id="emo-🙈">🙈</button><button role="menuitem" aria-selected="" aria-label="🙉, hear_no_evil"
            title="hear_no_evil" class="emoji " id="emo-🙉">🙉</button><button role="menuitem" aria-selected=""
            aria-label="🙊, speak_no_evil" title="speak_no_evil" class="emoji " id="emo-🙊">🙊</button><button
            role="menuitem" aria-selected="" aria-label="💌, love_letter" title="love_letter" class="emoji "
            id="emo-💌">💌</button><button role="menuitem" aria-selected="" aria-label="💘, cupid, heart_with_arrow"
            title="cupid, heart_with_arrow" class="emoji " id="emo-💘">💘</button><button role="menuitem"
            aria-selected="" aria-label="💝, gift_heart, heart_with_ribbon" title="gift_heart, heart_with_ribbon"
            class="emoji " id="emo-💝">💝</button><button role="menuitem" aria-selected=""
            aria-label="💖, sparkling_heart" title="sparkling_heart" class="emoji " id="emo-💖">💖</button><button
            role="menuitem" aria-selected="" aria-label="💗, growing_heart, heartpulse"
            title="growing_heart, heartpulse" class="emoji " id="emo-💗">💗</button><button role="menuitem"
            aria-selected="" aria-label="💓, beating_heart, heartbeat" title="beating_heart, heartbeat" class="emoji "
            id="emo-💓">💓</button><button role="menuitem" aria-selected="" aria-label="💞, revolving_hearts"
            title="revolving_hearts" class="emoji " id="emo-💞">💞</button><button role="menuitem" aria-selected=""
            aria-label="💕, two_hearts" title="two_hearts" class="emoji " id="emo-💕">💕</button><button role="menuitem"
            aria-selected="" aria-label="💟, heart_decoration" title="heart_decoration" class="emoji "
            id="emo-💟">💟</button><button role="menuitem" aria-selected="" aria-label="❣️, heart_exclamation"
            title="heart_exclamation" class="emoji " id="emo-❣️">❣️</button><button role="menuitem" aria-selected=""
            aria-label="💔, broken_heart" title="broken_heart" class="emoji " id="emo-💔">💔</button><button
            role="menuitem" aria-selected="" aria-label="❤️‍🔥, heart_on_fire" title="heart_on_fire" class="emoji "
            id="emo-❤️‍🔥">❤️‍🔥</button><button role="menuitem" aria-selected="" aria-label="❤️‍🩹, mending_heart"
            title="mending_heart" class="emoji " id="emo-❤️‍🩹">❤️‍🩹</button><button role="menuitem" aria-selected=""
            aria-label="❤️, heart, red_heart" title="heart, red_heart" class="emoji " id="emo-❤️">❤️</button><button
            role="menuitem" aria-selected="" aria-label="🧡, orange_heart" title="orange_heart" class="emoji "
            id="emo-🧡">🧡</button><button role="menuitem" aria-selected="" aria-label="💛, yellow_heart"
            title="yellow_heart" class="emoji " id="emo-💛">💛</button><button role="menuitem" aria-selected=""
            aria-label="💚, green_heart" title="green_heart" class="emoji " id="emo-💚">💚</button><button
            role="menuitem" aria-selected="" aria-label="💙, blue_heart" title="blue_heart" class="emoji "
            id="emo-💙">💙</button><button role="menuitem" aria-selected="" aria-label="💜, purple_heart"
            title="purple_heart" class="emoji " id="emo-💜">💜</button><button role="menuitem" aria-selected=""
            aria-label="🤎, brown_heart" title="brown_heart" class="emoji " id="emo-🤎">🤎</button><button
            role="menuitem" aria-selected="" aria-label="🖤, black_heart" title="black_heart" class="emoji "
            id="emo-🖤">🖤</button><button role="menuitem" aria-selected="" aria-label="🤍, white_heart"
            title="white_heart" class="emoji " id="emo-🤍">🤍</button><button role="menuitem" aria-selected=""
            aria-label="💋, kiss" title="kiss" class="emoji " id="emo-💋">💋</button><button role="menuitem"
            aria-selected="" aria-label="💯, 100" title="100" class="emoji " id="emo-💯">💯</button><button
            role="menuitem" aria-selected="" aria-label="💢, anger" title="anger" class="emoji "
            id="emo-💢">💢</button><button role="menuitem" aria-selected="" aria-label="💥, boom, collision"
            title="boom, collision" class="emoji " id="emo-💥">💥</button><button role="menuitem" aria-selected=""
            aria-label="💫, dizzy" title="dizzy" class="emoji " id="emo-💫">💫</button><button role="menuitem"
            aria-selected="" aria-label="💦, sweat_drops" title="sweat_drops" class="emoji "
            id="emo-💦">💦</button><button role="menuitem" aria-selected="" aria-label="💨, dash, dashing_away"
            title="dash, dashing_away" class="emoji " id="emo-💨">💨</button><button role="menuitem" aria-selected=""
            aria-label="🕳️, hole" title="hole" class="emoji " id="emo-🕳️">🕳️</button><button role="menuitem"
            aria-selected="" aria-label="💬, speech_balloon" title="speech_balloon" class="emoji "
            id="emo-💬">💬</button><button role="menuitem" aria-selected="" aria-label="👁️‍🗨️, eye_in_speech_bubble"
            title="eye_in_speech_bubble" class="emoji " id="emo-👁️‍🗨️">👁️‍🗨️</button><button role="menuitem"
            aria-selected="" aria-label="🗨️, left_speech_bubble" title="left_speech_bubble" class="emoji "
            id="emo-🗨️">🗨️</button><button role="menuitem" aria-selected="" aria-label="🗯️, right_anger_bubble"
            title="right_anger_bubble" class="emoji " id="emo-🗯️">🗯️</button><button role="menuitem" aria-selected=""
            aria-label="💭, thought_balloon" title="thought_balloon" class="emoji " id="emo-💭">💭</button><button
            role="menuitem" aria-selected="" aria-label="💤, zzz" title="zzz" class="emoji " id="emo-💤">💤</button>
    </div>
</template>

<script setup>
import { ro } from '@faker-js/faker';

const emit = defineEmits(['select-emoji']);

const handleEmojiClick = (e) => {
    console.log('[EmojiPanel] handleEmojiClick e ',e, e.originalTarget.textContent);
    emit('select-emoji',e.originalTarget && e.originalTarget.textContent)

}

</script>


<style>
    .emoji-menu {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        background-color: #fff;
        padding-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
    }

    .emoji {
        font-size: 32px;
        cursor: pointer;
    }
</style>