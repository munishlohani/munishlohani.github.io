---
layout: page
title: ChatDKU
description: An agentic RAG assistant that answers questions about Duke Kunshan University from official sources, with citations.
img: assets/img/chatdku/chatdku.png
importance: 1
category: work
---

<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/chatdku/chatdku_main.png" class="img-fluid rounded z-depth-1" sizes="(min-width: 576px) 60vw, 95vw" alt="The ChatDKU landing screen, signed in as a student, with suggested starter questions" %}
  </div>
</div>
<div class="caption">Signed in with a Duke NetID, the assistant opens on a few starter questions drawn from what students actually ask.</div>

[ChatDKU](https://chatdku.com) is an agentic AI assistant for Duke Kunshan University: it answers questions about policies, deadlines, courses, bulletins, and handbooks from official university sources, and links back to the material it used. It runs as a university-recognized platform built and maintained by student developers, with stakeholders across Advising, Career Services, Athletics, the Institute of Global Higher Education, and IT.

The entire system is locally deployed on DKU's own GPU servers, leveraging open source projects and frameworks. We built the architecture using [DSPy](https://dspy.ai/), which essentially gives the agentic modules to the system.

## Me in the Project

I joined this project as a [Summer Research Scholar](https://ugstudies.dukekunshan.edu.cn/student-summer-research-program/). Initially, I worked on backend refactoring, migrating from a simple Flask wrapper to a robust, end-to-end Django system with automation pipelines for system tests, a session backed chat system, and a privacy prioritized user system.


<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/chatdku/chatdku_query.png" class="img-fluid rounded z-depth-1" sizes="(min-width: 576px) 60vw, 95vw" alt="ChatDKU answering a question about the database course syllabus, with course content and learning outcomes" %}
  </div>
</div>
<div class="caption">A course question resolved against the curriculum: the agent identifies the right course for the major track, then lays out the syllabus from the source material. Each answer collects a helpful / not-helpful signal that feeds back into evaluation.</div>

While backend deployment remained my core task, I also moved into the core agent functionality. One of the first tasks we did was backend decoupling -- the agent was served separately from the core Django backend. This allowed simultaneous development on both ends, without the two conflicting with one another. To achieve this, we used [FastAPI](https://fastapi.tiangolo.com/) to wrap around the agent, and connected the two backends using `http` requests. To keep requests unique, we used random IDs to create a chatId between chat tasks. This also allowed us to directly stream responses using SSE, and to enable intermediate streaming using [redis](https://redis.io/).

<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/chatdku/chatdku_reason.png" class="img-fluid rounded z-depth-1" sizes="(min-width: 576px) 60vw, 95vw" alt="A development build showing the executor's memory-recall trace: courses already taken, expected graduation year, and a prior eligibility confirmation" %}
  </div>
</div>
<div class="caption">A development build with the reasoning trace exposed. Asked about eligibility for a course, the executor first recalls what it already knows about the student — courses taken, expected graduation year, an earlier eligibility check — before it goes looking for policy.</div>

My current work on the project is mainly based on the agent system design which also belongs to my work during my second Summer Research Scholar program. 

One of the primary design choices we made was to have a separate tool server. As our functionality, and team grew, tool creation increased. Prior, tool addition/ removal required an agent bootup, which added to the downtime. But, a dedicated tool server allowed us to use the agent without a restart. My work was in the design of this tool server decoupling process, serving the tool via a FastAPI app, with tool location maintained in a tool registry. To minimize tool server downtime, we also allowed tools to be dynamically added /removed, using the registry as the source.

In addition to this tool server, I also contributed towards long term memory, and cross session memory leveraging [Mem0](https://github.com/mem0ai/mem0). While adding memory, I found that memory addition took considerable time, with agent curating a user memory. In order to tackle this problem, memory addition was offloaded as a background job. 

## Evaluation

I built a RAG evaluation platform on top of existing evaluation frameworks to compare LLM choices and pipeline configurations on retrieval quality, sufficiency judgments, and answer accuracy. 


<div class="mt-4">
  <a class="btn btn-sm z-depth-0" role="button" href="https://chatdku.com" target="_blank" rel="noopener">Visit chatdku.com [public demo interface]</a>
</div>

<div class="mt-4">
  <a class="btn btn-sm z-depth-0" role="button" href="https://chatdku.dukekunshan.edu.cn" target="_blank" rel="noopener">Visit chatdku.dukekunshan.edu.cn [DKU network only]</a>
</div>

</br>

**Note:** *Em dashes in this post is entirely Human Generated*