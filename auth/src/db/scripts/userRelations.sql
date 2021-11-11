CREATE TABLE public.userrelationsstate
(
    id SERIAL PRIMARY KEY,
    userid integer NOT NULL,
    state integer,
    CONSTRAINT from_user FOREIGN KEY (userId)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE public.userrelations
(
    id SERIAL PRIMARY KEY,
    userId integer NOT NULL,
    targetuserid integer NOT NULL,
    stateid integer NOT NULL,
    CONSTRAINT userid_user FOREIGN KEY (userId)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT targetuserid_user FOREIGN KEY (targetuserid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT stateid_userrelationsstate FOREIGN KEY (stateid)
        REFERENCES public.userrelationsstate (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);
